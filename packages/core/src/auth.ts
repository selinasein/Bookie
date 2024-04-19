import type { LambdaEvent, LambdaContext } from "hono/aws-lambda";
import { createMiddleware } from "hono/factory";

type EnhancedLambdaEvent = LambdaEvent & {
  requestContext: {
    authorizer: {
      jwt?: {
        claims: {
          sub: string;
        };
      };
    };
  };
};

type AuthEnv = {
  Variables: { userId: string };
  Bindings: { event: EnhancedLambdaEvent; context: LambdaContext };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const userId = c.env.event.requestContext?.authorizer?.jwt?.claims.sub;
  if (!userId) {
    return c.json({ error: "Unauthorized" }, { status: 401 });
  }
  c.set("userId", userId);
  await next();
});
