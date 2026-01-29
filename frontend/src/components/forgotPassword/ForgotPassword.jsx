import React, { useState } from "react";
import axios from "../../Axios/axios.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/forgot-password",
        { email }
      );

      setMessage(response.data.message);
      setEmail("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold p-5">Forgot Password</h1>

      <form
        className="w-2/5 mx-auto p-5"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="p-3 rounded-md shadow-lg w-full"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-md shadow-md bg-indigo-700 text-white px-5 mt-10 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <div className="mt-10 bg-green-700 mx-auto w-2/5 p-3 rounded-lg shadow-lg text-white text-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-10 bg-red-700 mx-auto w-2/5 p-3 rounded-lg shadow-lg text-white text-lg">
          {error}
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
