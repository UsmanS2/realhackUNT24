"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (submit) {
      if (email.endsWith("@cbre.com")) {
        router.push("/pm/dashboard");
      } else {
        router.push("/tenant-dashboard");
      }
    }
  }, [submit, email, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <div className='flex h-screen'>
      <div className='flex-1 bg-green-900 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-white text-5xl font-bold mb-4'>Propertunity</h2>
          <p className='text-white text-lg'>
            Where AI predicts property needs and resolves tenant concerns before
            they become problems.
          </p>
        </div>
      </div>

      <div className='flex-1 bg-white flex flex-col justify-center p-8'>
        <h1 className='text-3xl font-extrabold text-green-900 mb-4'>
          Welcome to Propertunity
        </h1>
        <p className='text-gray-600 text-lg mb-6'>
          Manage your property seamlessly with Propertunity.
        </p>

        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full'
              placeholder='Enter your password'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all duration-300'
          >
            Login with Propertunity
          </button>
        </form>

        <div className='mt-4 text-center'>
          <button
            className='w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-all duration-300'
            onClick={() => alert("Signup feature is coming soon!")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
