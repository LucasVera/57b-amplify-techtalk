1. crear nueva app de react (cra)
- `npx create-react-app 57b-amplify`
- después de que termine de instalar, `npm start`
- Se abre un navegador con la app de react

2. instalar amplify-cli
- `npm install -g @aws-amplify/cli`

3. configurar amplify
- `amplify configure` en el root de la app
- se abre un navegador para iniciar sesión en la consola de aws
- después de login a la consola, volver a la terminal y darle enter
- poner nombre
- se abre otro navegador en IAM para crear usuario
- terminar creación de usuario (aceptar defaults) y volver a la terminal enter
- agregar access key id and secret access key en la terminal
- darle nombre el perfil en la máquina local

3. inicializar amplify en la app de react
- `amplify init`
- poner nombre
- aceptar defaults
- en auth_method, seleccionar profile
- seleccionar perfil que acabo de crear (default)
- se van a crear los recursos de nube iniciales
- amplify status muestra ambiente y recursos del proyecto (por ahora vacíos)

4. Listos para agregar backend!
