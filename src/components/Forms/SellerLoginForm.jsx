import React from "react";

const SellerLoginForm = () => {
  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-2xl font-semibold">Welcome Back!</h1>
      <p className="font-medium text-sm text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button>Forgot password</button>
        </div>
      </div>
    </div>
  );
};

export default SellerLoginForm;
