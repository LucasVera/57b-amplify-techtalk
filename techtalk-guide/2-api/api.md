1. añadir api
- `amplify add api`
- aceptar defaults
- pregunta si se quiere editar el schema, poner Y
- abre el archivo de esquema de graphql con el modelo de Todo
- para efectos prácticos, dejarlo así

2. sincronizar con nube y generar código
- `amplify status` muestra los recursos y cambios, luego `amplify push`
- pregunta si se quiere generar código del api, Y
- dejar los demás defaults
- se crea el código para interactuar con la api, solo es usarlo dentro de react

3. Usar los queries y mutations
- agregar API y graphqlOperation al import de 'aws-amplify'
- crear componentes y estado necesario para usar el api (copy paste del archivo)
- hacer pruebas creando un par de todos, recargando página, etc
- `amplify api console` nos lleva a la consola de aws donde podemos ver
  - métricas
  - data sources (donde se guardan los datos)
  - configuraciones
  - entre otras



