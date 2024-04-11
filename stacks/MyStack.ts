//This is where I write the SST API construct.
import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /books/top": "packages/functions/src/books.handler",
      "GET /cs": {
        function: {
          handler: "packages/csharp/CSharpFunction",
          runtime: "container",
        },
      },

      // "GET /todo": "packages/functions/src/todo.list",
      // "POST /todo": "packages/functions/src/todo.create",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
