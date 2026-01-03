import React from "react";
import Chatbot from "./Chatbot";
import "./FloatingChatbot.css";

export default function FloatingChatbot() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                  <circle cx="8" cy="15" r="1"/>
                  <circle cx="16" cy="15" r="1"/>
                </svg>
              </div>
              <div className="header-text">
                <span className="bot-name">Car Rental Assistant</span>
                <span className="bot-status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="chat-body">
            <Chatbot />
          </div>

          <div className="chat-footer">
            <span className="footer-text">Powered by AI</span>
          </div>
        </div>
      )}

      <button 
        className={`chat-fab ${open ? 'fab-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <svg className="fab-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="notification-badge">1</span>
      </button>
    </>
  );
}