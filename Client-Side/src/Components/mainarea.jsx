import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mainarea() {
  const [ques, setQues] = useState("");
  const [prevQues, setPrevQues] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [ChatHistory, setChatHistory] = useState([]);
  const [sender , setSender] = useState("");
  const navigate = useNavigate();

  function NewChat() {
    setMessage("");
    setQues("");
    setPrevQues("");
  }

  useEffect(() => {
    axios
      .get("/chat-history", { withCredentials: true })
      .then((resp) => {
        setChatHistory(resp.data);
        console.log(resp.data);
        setError("");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/user/login"); // Update this route as necessary
          }, 2000); // Delay for user feedback
        } else {
          setError("Failed to fetch chat history.");
        }
      });
  }, [navigate]);

  const handleChange = (e) => setQues(e.target.value);

  function openChat(question , answer , sender) {
    setMessage(answer);
    setSender(sender);
    setPrevQues(question);
  }

  const getResponse = async () => {
    if (ques.trim().length === 0) {
      setError("Please ask a question!");
      return;
    }
    try {
      const response = await axios.post(
        "/request",
        { ques },
        { withCredentials: true }
      );
      setMessage(response.data);
      setPrevQues(ques);
      setQues("");
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
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
          + New Chat +
        </button>
        <div className="border-2 flex justify-around border-gray-300 text-yellow-200 text-lg mx-8 px-4 py-2 mt-4 h-5/6 overflow-y-auto">
          {ChatHistory.length === 0 ? (
            <p>No chat history available.</p>
          ) : (
            <ul>
              {ChatHistory.map((item, i) => (
                <li
                  key={i}
                  className="border border-gray-400 text-yellow-200 text-left mx-auto px-4 py-2 mt-2 bg-gray-800 rounded-md"
                >
                  <strong>Q:</strong> {item.question}
                  <button onClick={() => openChat(item.question, item.message , item.sender)} className="border-2 bg-black text-white mx-2">+</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h1 className="text-center text-white text-6xl">---------</h1>
        <h1 className="text-center text-rose-300 mt-2"> Made by Parth Sauguny </h1>
      </div>

      {/* Main Area */}
      <div className="bg-slate-500 w-4/5 flex flex-col">
        <h1 className="text-center text-6xl font-semibold font-serif py-4 text-violet-950">
          Tarang
        </h1>
        <div className="h-3/4 border-2 border-black rounded-lg m-4 p-4 overflow-y-auto bg-gray-800 text-white text-lg">
          {prevQues ? (
              <div
                className="border-b border-gray-600 mb-4 pb-4 text-left"
              >
                <p>
                  <span className="font-bold text-blue-400">{sender}:</span>{" "}
                  {prevQues}
                </p>
                <p>
                  <span className="font-bold text-green-400">Tarang:</span>{" "}
                  {message}
                </p>
              </div>
          ) : (
            <p className="text-center">Start a new chat!</p>
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
