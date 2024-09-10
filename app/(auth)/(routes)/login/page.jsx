import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
      />

      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4"
      >
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
      />

      <div className="mt-6 flex justify-between">
        <button
          type="submit"
          formAction={login}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Log in
        </button>
        <button
          type="submit"
          formAction={signup}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
