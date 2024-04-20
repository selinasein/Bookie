import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  //neulm or prod

  const audience = `api-Bookie-${stack.stage}`;
  const api = new Api(stack, "api", {
    cors: true,
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://bookie.kinde.com",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
          ACCESS_KEY_ID: process.env.ACCESS_KEY_ID!,
          ACCESS_KEY: process.env.ACCESS_KEY!,
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /books/single/{bookTitle}/{author}": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/books.handler",
        },
      },
      "GET /books/{title}": {
        authorizer: "none",
        function: {
          runtime: "container",
          handler: "packages/csharp/CSharpFunction",
          timeout: "20 seconds",
        },
      },
      "GET /books/best": {
        authorizer: "none",
        function: {
          runtime: "container",
          handler: "packages/csharp/CSharpFunction",
          timeout: "20 seconds",
        },
      },
      "GET /note": "packages/functions/src/notes.handler",
      "GET /note/liked": "packages/functions/src/notes.handler",
      "POST /note": "packages/functions/src/notes.handler",
      "DELETE /note/{id}": "packages/functions/src/notes.handler",
      "POST /note/{id}/likes": "packages/functions/src/notes.handler",
      "DELETE /note/{id}/likes": "packages/functions/src/notes.handler",
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    websiteURL: web.url,
  });
}
