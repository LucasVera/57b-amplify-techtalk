1. agregar auth
- `amplify add auth`
- escoger default
- escoger email
- no, I'm done
- `amplify status` muestra los recursos y estado
- `amplify push` crea los recursos de la nube necesarios

2. agregar componentes de auth y sdk
- `npm i @aws-amplify/ui-react aws-amplify`
- en App.js, importar los estilos de la librería:
  - import '@aws-amplify/ui-react/styles.css';
- Borrar el html de App.js y poner lo siguiente

```
<div>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <p>your email is {user.attributes.email}</p>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
```


- Agregar la configuración de amplify

```
// connect this app with aws resources
import awsConfig from './aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure(awsConfig);
```


- arrancar la app (`npm start`)
- hacer pruebas y validaciones

3. Qué acabamos de hacer?
- Creamos autenticación en la nube de aws
- conectamos los recursos de autenticación de aws con nuestra app de react
- usamos componentes pre-construidos para casos de uso más comunes
- `amplify auth console`
- seleccionar "user pool"
- nos muestra en el navegador qué exactamente creamos y los usuarios registrados

