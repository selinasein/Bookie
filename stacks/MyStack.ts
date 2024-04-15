//This is where I write the SST API construct.
import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  //neulm or prod

  const audience = `api-Bookie-${stack.stage}`;
  const api = new Api(stack, "api", {
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
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /books/{title}": {
        authorizer: "none",
        function: {
          runtime: "container",
          handler: "packages/csharp/CSharpFunction",
        },
      },
      "GET /books/best": {
        authorizer: "none",
        function: {
          runtime: "container",
          handler: "packages/csharp/CSharpFunction",
        },
      },
      // MANAGING NOTES (TYPESCRIPT-HONO)
      // "GET /notes": "packages/functions/src/notes.handler",
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
