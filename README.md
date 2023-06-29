<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Empowerment Labs Movies

API de Empowerment Labs para el registro de usuarios y consulta de películas

## Stack

- NestJS
- DynamoDB
- Axios
- AWS Cognito
- Passport.js
- Swagger

## Instalación

```bash
$ yarn global add serverless
$ yarn install
```

## Ejecutar la aplicación

```bash
# build
$ yarn run build

# run
$ serverless offline
```

## Infraestructura

- API: https://mn2wfsita3.us-east-2.awsapprunner.com/api

El proyecto originalmente fue requerido sobre Serverless Framework para construir un API Gateway con funciones Lambda. Sin embargo perdí demasiado tiempo peleando con un error al momento
de hacer deploy y resultó ser de Serverless, aveces ocurre aveces no, vease aquí: https://forum.serverless.com/t/emfile-too-many-open-files-error-while-ci-cd-deploy/14245. Implementé el 
CodeBuild sobre CodePipeline pero tuve el mismo problema. Pero bueno creo que con la implementacion en el serverlesss.yml se puede apreciar el trabajo mientras soluciono el problema.
Por ahora se desplegó con App Runner para la muestra.

## Pendientes

Me hubiera encantado completar la prueba al 100% pero he tenido bastantes problemas de tiempo. Anoto por aquí los features que hacen falta para una mejor calidad en el software.

- Controlar mejor los errores en los controladores y servicios para tener una repuesta correcta de los errores.
- Documentar los errores también en Swagger.
- Se empezó a escribir un ValidationPipe(), sin embargo no se terminó.
- Se empezó a construir un middleware para validar que los usuarios y peliculas si existieran, sin embargo no se terminó.
- Se necesita validar que no repitan nota o favoritos ya que DynamoDB no cuenta con un unique() cómo lo hace MongoDB.

## License

Nest is [MIT licensed](LICENSE).
