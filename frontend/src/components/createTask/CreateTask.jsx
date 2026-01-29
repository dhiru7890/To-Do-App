import React, { useState, useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";
import "./createTask.css";

function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/task",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // backend response se hi state update
      dispatch({
        type: "ADD_TASK",
        payload: response.data,
      });

      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="w-11/12">
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="my-3">
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-2 text-center">
              {error}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 rounded-md text-white px-5 py-1 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
