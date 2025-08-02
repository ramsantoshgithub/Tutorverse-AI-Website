import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SendBtn from "../../assets/send.svg";
import RoboIcon from "../../assets/robo.png";
import usericon from "../../assets/user-icon.png";

function Main() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Tutorverse this side. What topic can I help you learn about today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // API call to your FastAPI backend
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_prompt: currentInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false); // Turn off "thinking..." message

      // --- NEW LOGIC: Display each part of the response one by one ---

      // 1. Add the Explanation immediately
      if (data.explanation) {
        const explanationMessage = {
          sender: "bot",
          text: `### Explanation\n${data.explanation}`,
        };
        setMessages((prev) => [...prev, explanationMessage]);
      }

      // 2. Add Resources after a short delay
      setTimeout(() => {
        if (data.resources) {
          const resourcesMessage = {
            sender: "bot",
            text: `### Suggested Resources\n${data.resources}`,
          };
          setMessages((prev) => [...prev, resourcesMessage]);
        }
      }, 1000); // 1-second delay

      // 3. Add Quiz after a second delay
      setTimeout(() => {
        if (data.quiz) {
          const quizMessage = {
            sender: "bot",
            text: `### Quiz\n${data.quiz}`,
          };
          setMessages((prev) => [...prev, quizMessage]);
        }
      }, 2000); // 2-second delay
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    // Removed the 'finally' block as setIsLoading is handled in try/catch
  };

  return (
    <div className="main-bar">
      <div className="chats">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.sender === "bot" ? "bot" : ""}`}
          >
            <img
              className="chatImg"
              src={msg.sender === "bot" ? RoboIcon : usericon}
              alt=""
            />
            <div className="txt">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat bot">
            <img className="chatImg" src={RoboIcon} alt="Loading..." />
            <p className="txt">Tutorverse is thinking...</p>
          </div>
        )}
      </div>
      <div className="chatFooter">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Send a Message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send" onClick={handleSend}>
            <img src={SendBtn} alt="send-button" />
          </button>
        </div>
        <p>
          Disclaimer: Tutorverse uses AI and may occasionally provide incorrect
          information. Please verify important answers.
        </p>
      </div>
    </div>
  );
}

export default Main;