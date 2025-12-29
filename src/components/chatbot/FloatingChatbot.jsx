import React from "react"
import Chatbot from "./Chatbot"

export default function FloatingChatbot() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {open && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span>Car Rental Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div style={styles.body}>
            <Chatbot />
          </div>
        </div>
      )}

      <button style={styles.fab} onClick={() => setOpen(true)}>
        💬
      </button>
    </>
  )
}

const styles = {
  fab: {
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: "50%",
    fontSize: 24,
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    zIndex: 1000
  },
  chatWindow: {
    position: "fixed",
    bottom: 90,
    right: 24,
    width: 360,
    height: 460,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000
  },
  header: {
    padding: "12px 16px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  body: {
    padding: 12,
    flex: 1,
    overflowY: "auto"
  }
}
