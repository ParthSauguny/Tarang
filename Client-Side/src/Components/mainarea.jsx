import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Waveform from "./Waveform";

function Mainarea() {
  const [ques, setQues] = useState("");
  const [error, setError] = useState("");
  const [thread, setThread] = useState([]); // flat list of {role, text, sender?, id}
  const [rawHistory, setRawHistory] = useState([]); // original chatHistory items, for sidebar
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const messageRefs = useRef({});

  function historyToThread(history) {
    return history.flatMap((item, i) => ([
      { role: "user", text: item.question, sender: item.sender, id: `u-${i}` },
      { role: "assistant", text: item.message, id: `a-${i}` },
    ]));
  }

  function NewChat() {
    setThread([]);
    setQues("");
    setError("");
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASEURL}/conversations/chat-history`, { withCredentials: true })
      .then((resp) => {
        setRawHistory(resp.data);
        setThread(historyToThread(resp.data));
        setError("");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/user/login"), 2000);
        } else {
          setError("Failed to fetch chat history.");
        }
      })
      .finally(() => setHistoryLoading(false));
  }, [navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread, loading]);

  const handleChange = (e) => setQues(e.target.value);

  function jumpToMessage(index) {
    setThread(historyToThread(rawHistory));

    setTimeout(() => {
      messageRefs.current[`u-${index}`]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
  }

  const getResponse = async (e) => {
    e?.preventDefault();
    if (ques.trim().length === 0) {
      setError("Please ask a question!");
      return;
    }
    const question = ques;
    setThread((prev) => [...prev, { role: "user", text: question, id: `pending-u-${Date.now()}` }]);
    setQues("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/conversations/request`,
        { ques: question },
        { withCredentials: true }
      );
      setThread((prev) => [...prev, { role: "assistant", text: response.data, id: `pending-a-${Date.now()}` }]);
      setRawHistory((prev) => [...prev, { question, message: response.data, sender: "you" }]);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        setTimeout(() => navigate("/user/login"), 2000);
      } else {
        setError("Something went wrong! Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen bg-ocean-bg font-sans">
      {/* Sidebar */}
      <aside className="bg-ocean-surface border-r border-ocean-border flex flex-col h-full w-72 shrink-0">
        <div className="flex items-center gap-2 px-5 pt-6 pb-4">
          <Waveform size="sm" />
          <span className="font-display text-xl text-foam tracking-wide">Tarang</span>
        </div>

        <div className="px-4">
          <button
            onClick={NewChat}
            className="w-full rounded-full border border-ocean-border bg-ocean-surfaceAlt text-foam text-sm font-medium py-2.5 hover:border-wave-teal hover:text-wave-teal transition-colors"
          >
            + New chat
          </button>
        </div>

        <div className="mt-4 px-4 text-xs uppercase tracking-widest text-mist">History</div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {historyLoading ? (
            <p className="text-mist text-sm px-1 py-2">Loading history…</p>
          ) : rawHistory.length === 0 ? (
            <p className="text-mist text-sm px-1 py-2">No chats yet. Ask something to get started.</p>
          ) : (
            rawHistory.map((item, i) => (
              <button
                key={i}
                onClick={() => jumpToMessage(i)}
                className="w-full text-left rounded-lg border border-ocean-border bg-ocean-bg/40 px-3 py-2 text-sm text-foam/90 hover:border-wave-teal/60 hover:bg-ocean-surfaceAlt transition-colors truncate"
                title={item.question}
              >
                {item.question}
              </button>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-ocean-border">
          <p className="text-center text-xs text-mist">Made by Parth Sauguny</p>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-ocean-border px-6 py-4">
          <h1 className="font-display text-2xl text-foam tracking-wide">Tarang</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-0">
          <div className="max-w-2xl mx-auto py-6 flex flex-col gap-4">
            {thread.length === 0 && !historyLoading ? (
              <div className="text-center text-mist mt-24">
                <Waveform size="lg" className="justify-center mb-4" />
                <p className="font-display text-lg text-foam/80">Start a new chat!</p>
              </div>
            ) : (
              thread.map((msg) => (
                <div
                  key={msg.id}
                  ref={(el) => { if (msg.role === "user") messageRefs.current[msg.id] = el; }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <Waveform size="sm" className="mr-2 mt-3 shrink-0" />
                  )}
                  <div
                    className={
                      msg.role === "user"
                        ? "bg-wave-gradient text-ocean-bg font-medium rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] whitespace-pre-wrap"
                        : "bg-ocean-surfaceAlt text-foam rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%] whitespace-pre-wrap border border-ocean-border"
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex justify-start">
                <Waveform animated size="sm" className="mr-2 mt-3 shrink-0" />
                <div className="bg-ocean-surfaceAlt border border-ocean-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                  <Waveform animated size="md" />
                  <span className="text-mist text-sm">Tarang is thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <form onSubmit={getResponse} className="border-t border-ocean-border px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <input
              id="chat-input"
              aria-label="Chat input"
              name="message"
              value={ques}
              onChange={handleChange}
              disabled={loading}
              className="flex-1 bg-ocean-surface border border-ocean-border outline-none focus:border-wave-teal rounded-full text-foam placeholder-mist px-5 py-3 disabled:opacity-60"
              type="text"
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-wave-gradient text-ocean-bg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              aria-label="Send message"
            >
              ➢
            </button>
          </div>
          {error && <p className="text-coral text-center text-sm mt-3 max-w-2xl mx-auto">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Mainarea;
