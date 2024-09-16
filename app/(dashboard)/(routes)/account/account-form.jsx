"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AccountForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();
      console.log("data", data);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);

      alert("Error loading user data! xxx5x5x5x5");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      console.log(error);

      alert("Error updating the data 2222!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-900">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-600 dark:text-gray-400"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="mt-2 block w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-gray-600 dark:text-gray-400"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="mt-2 block w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-gray-600 dark:text-gray-400"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 block w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="website"
          className="block text-sm font-semibold text-gray-600 dark:text-gray-400"
        >
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-2 block w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold text-gray-100 bg-gray-600 hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white inline mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>

        <form action="/auth/signout" method="post">
          <button
            className="px-6 py-2 rounded-lg font-semibold text-gray-100 bg-gray-500 hover:bg-gray-600 transition-colors dark:bg-gray-600 dark:hover:bg-gray-500"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
