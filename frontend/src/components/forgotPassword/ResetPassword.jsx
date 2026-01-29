import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../Axios/axios.js";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/reset-password",
        { token, password }
      );

      setMessage(response.data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to reset password. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold p-5">Reset Password</h1>

      <form
        className="w-2/5 mx-auto p-5"
        onSubmit={handleSubmit}
      >
        <input
          type="password"
          className="p-3 rounded-md shadow-lg w-full my-4"
          placeholder="Enter new password"
          value={password}
          required
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="p-3 rounded-md shadow-lg w-full my-4"
          placeholder="Confirm new password"
          value={confirmPassword}
          required
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-md shadow-md bg-indigo-700 text-white px-5 mt-10 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
