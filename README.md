# NextJS GraphQL Hooks Auth

### Authentication system boilerplate application using NextJS, GraphQL, Apollo Client, Apollo Server, MongoDB, and Nginx

[View the live demo](https://auth.developal.ca)

_You will need a .env file in the server directory with the following environment variables_\
_This uses Mailtrap for testing the password reset functionality. see: https://mailtrap.io/_

```
MONGO_URI  - URI pointing to your mongodb instance
CLIENT_URI - Client side URI
JWT_SECRET - Secret for jsonwebtoken
SERVER_URI - Server side URI
DOMAIN     - Domain for Cookie
PORT       - GraphQL server port
MAIL_HOST  - Mailtrap host
MAIL_PORT  - Mailtrap port
MAIL_USER  - Mailtrap user
MAIL_PASS  - Mailtrap password
NODE_ENV   - Node environment
```

To run in development mode

```sh
$ docker-compose up
```

**NOTE: There is a production deployment pipeline setup with TravisCI, DockerHub, and Kubernetes that runs in a Minikube cluster. I can supply full instructions if needed to get you setup for the production deployment pipeline**
