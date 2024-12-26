import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function Mainarea() {
  const [ques, setQues] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [ChatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to clear chat and start a new one
  function NewChat() {
    setMessage("");
    setQues("");
  }

  // Fetch chat history when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/chat-history", { withCredentials: true })
      .then((resp) => {
        setChatHistory(resp.data);
        console.log(resp);
        console.log(ChatHistory); // Update chat history state with fetched data
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Session expired or user is not authenticated
          setError("Session expired. Please log in again.");
          // Redirect to login page
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Wait for 2 seconds before redirecting
        } else {
          setError("Failed to fetch chat history. Please try again later.");
        }
      });
  }, [navigate]); // Dependency array to make sure navigate is available

  // Handle changes in the input field
  const handleChange = (e) => {
    setQues(e.target.value);
  };

  // Handle sending a new message
  const getResponse = async () => {
    if (ques.trim().length === 0) {
      setError("Please ask a question!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/request",
        { ques },
        { withCredentials: true }
      );
      // Append new message to the chat history
      const newMessage = { sender: "You", question: ques, response: response.data };
      setChatHistory((prevHistory) => [...prevHistory, newMessage]); // Add new message to chat history
      setMessage(response.data);
      setQues(""); // Clear input field
      setError(""); // Clear error if successful
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Session expired. Please log in again.");
        setTimeout(() => {
          navigate("/user/login");
        }, 2000); // Redirect to login after 2 seconds
      } else {
        setError("Something went wrong! Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="bg-violet-950 flex flex-col h-full w-1/5">
        <button
          onClick={NewChat}
          className="mx-auto mt-4 border-4 border-slate-400 bg-black text-white rounded-2xl p-2 font-semibold font-serif"
        >
          + New Chat
        </button>
        <div className="border-2 border-gray-300 text-center text-yellow-200 text-lg mx-8 px-4 py-2 mt-4 h-5/6 overflow-y-auto">
          {ChatHistory.length === 0 ? (
            <p>No chat history available.</p>
          ) : (
            <ul>
              {ChatHistory.map((item, i) => (
                <li
                  key={i}
                  className="border border-gray-400 text-yellow-200 text-left mx-auto px-4 py-2 mt-2 bg-gray-800 rounded-md"
                >
                  <strong>{item.question}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h1 className="text-center text-rose-300 mt-4"> Made by Parth Sauguny </h1>
      </div>

      {/* Main Area */}
      <div className="bg-slate-500 w-4/5 flex flex-col">
        <h1 className="text-center text-6xl font-semibold font-serif py-4 text-violet-950">
          Tarang
        </h1>
        <div className="h-3/4 border-2 border-black rounded-lg m-4 p-4 overflow-y-auto bg-gray-800 text-white text-lg">
          {message ? (
            <div>{message}</div>
          ) : (
            <p className="text-gray-400">Your response will appear here...</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-auto pb-6">
          <input
            id="chat-input"
            aria-label="Chat input"
            name="message"
            value={ques}
            onChange={handleChange}
            className="w-3/5 border-2 outline-none border-black rounded-2xl text-xl px-4 py-2"
            type="text"
            placeholder="Type your message here..."
          />
          <button
            onClick={getResponse}
            className="ml-4 px-6 py-2 rounded-lg border-x-2 border-y-4 border-violet-800 hover:bg-violet-500 bg-violet-700 text-white font-semibold"
            aria-label="Send message"
          >
            ➢
          </button>
        </div>
        {error && <h1 className="text-red-800 text-center mt-2">{error}</h1>}
      </div>
    </div>
  );
}

export default Mainarea;
