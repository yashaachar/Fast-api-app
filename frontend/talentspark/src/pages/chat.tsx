import { useState, useRef, useEffect } from "react";
import { askCareerBot } from "../Services/ChatServices";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  token: string;
}

const Chat = ({ token }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await askCareerBot(token, input);
      setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: couldn't reach the bot." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-shell">
      <h1 className="page-title">Career Chat</h1>
      <p className="page-subtitle">Ask about roles, skills, and next steps.</p>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble-row ${msg.role === "user" ? "user" : ""}`}>
            <div className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}>
              {msg.role === "assistant" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && <p className="page-subtitle">Bot is typing...</p>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="input"
          style={{ marginBottom: 0 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about your career..."
        />
        <button className="btn btn-primary" onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;