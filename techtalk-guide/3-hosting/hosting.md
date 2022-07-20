1. Configurar hosting
- `amplify add hosting`
- seleccionar default
- seleccionar `Manual deployment`

2. publicar app
- `amplify push` para crear los recursos de nube necesarios
- `amplify publish` para publicar una nueva versión

3. publicar otro ambiente (prd)
- `amplify add env`
- en nombre, poner prd
- seleccionar perfil creado en el paso init
- Cuando termine, `amplify status` muestra que estamos en prd y que debe crear más recursos
- `amplify push` crea los recursos para el ambiente de prd (toma varios minutos)
- `amplify publish`



