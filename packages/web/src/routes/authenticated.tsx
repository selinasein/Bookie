import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Login({}) {
  const { login, register } = useKindeAuth();

  return (
    <div className="flex items-center min-h-screen px-4">
      <div className="mx-auto w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
            </div>
            <input id="password" required type="password" />
          </div>

          <button
            onClick={() => {
              register();
            }}
            type="button"
          >
            Sign up
          </button>

          <button
            onClick={() => {
              login();
            }}
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

