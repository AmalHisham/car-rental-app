import React from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { knowledgeBase } from "../../data/knowledgeBase"

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

export default function Chatbot() {
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    })

    // Build conversation history
    const conversation = messages
      .map(m => `${m.role.toUpperCase()}: ${m.text}`)
      .join("\n")

    const prompt = `
You are a car rental assistant.
Answer ONLY using the information below.
If the answer is not present, say "I don't have that information".

INFORMATION:
${knowledgeBase}

CONVERSATION SO FAR:
${conversation}

USER:
${userMessage.text}
`

    const result = await model.generateContent(prompt)
    const reply = result.response.text()

    setMessages(prev => [
      ...prev,
      { role: "assistant", text: reply }
    ])

    setLoading(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 8,
              textAlign: msg.role === "user" ? "right" : "left"
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 12,
                background:
                  msg.role === "user" ? "#2563eb" : "#f1f5f9",
                color: msg.role === "user" ? "white" : "black",
                maxWidth: "80%"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && <p>Thinking...</p>}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Ask about cars, prices, rules..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  )
}
