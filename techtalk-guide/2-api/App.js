import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';

// connect this app with aws resources
import awsConfig from './aws-exports';
Amplify.configure(awsConfig);

const getNewId = () => `${new Date().valueOf()}-${Math.round(Math.random() * 1000)}`;

function App() {
  // State to:
  // - hold a flag for loading/not-loading
  // - list of todos to show
  // - new todo to be created
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: '',
    name: '',
    description: '',
  });

  // When page is loaded, get the todos from api
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      // - set loading flag so loader can be shown
      // - get the todos from api via graphql helper
      // - extract todo list from raw query result
      // - set todos in state so they can be shown
      // - turn off loader
      setIsLoading(true);
      const queryResult = await API.graphql(graphqlOperation(listTodos, { limit: 20 }));
      const todos = queryResult?.data?.listTodos?.items;
      setTodos(todos || []);
    }
    catch (error) {
      console.log('Error getting all todos', error);
    }
    setIsLoading(false);
  }

  const onTodoFieldChange = (e) => {
    // sets the field that changed in the input
    e.preventDefault();
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  }

  const saveTodo = async (e) => {
    // turn on loader
    // save todo through graphql api (append a new id first)
    // refresh the todo list
    // turn off loader
    e.preventDefault();
    setIsLoading(true);
    await API.graphql(graphqlOperation(createTodo, {
      input: {
        ...newTodo,
        id: getNewId(),
      }
    }));
    getTodos();
    setIsLoading(false);
  }

  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <p>your email is {user.attributes.email}</p>
            <button onClick={signOut}>Sign out</button>
            {isLoading ? <p>Loading...</p> : (
              <div>
                <h2 style={{ padding: '0px 50px' }}>Todo List</h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  border: '1px solid grey',
                  margin: '0 50px',
                  padding: '50px',
                }}>
                  {todos && todos.length <= 0 ? <p>No Todos found...</p> : todos.map(todo => (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'start',
                      flexDirection: 'column',
                      border: '1px solid grey',
                      borderRadius: '5px',
                      margin: '10px',
                      padding: '10px',
                    }}>
                      <p>Name: {todo.name}</p>
                      <p>Description: {todo.description}</p>
                      <p>Id: {todo.id}</p>
                    </div>
                  ))}
                </div>

                <div style={{
                  margin: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid darkblue',
                  flexDirection: 'column'
                }}>
                  <h2 style={{ margin: '5px' }}>Create new Todo</h2>
                  <input
                    type="text"
                    value={newTodo.name}
                    placeholder='Name'
                    name='name'
                    onChange={onTodoFieldChange}
                    style={{ margin: '10px' }}
                  />
                  <input
                    type="text"
                    value={newTodo.description}
                    placeholder='Description'
                    name='description'
                    onChange={onTodoFieldChange}
                    style={{ margin: '10px' }}
                  />
                  <button
                    onClick={saveTodo}
                    disabled={isLoading}
                  >
                    Save Todo
                  </button>
                </div>
              </div>
            )}

          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
