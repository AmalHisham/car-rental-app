import React from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { knowledgeBase } from "../../data/knowledgeBase"


const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  )

  export default function Chatbot() {
    const [question, setQuestion] = React.useState("")
    const [answer, setAnswer] = React.useState("")
    const [loading, setLoading] = React.useState(false)
  
    async function askQuestion() {
      if (!question) return
  
      setLoading(true)
      setAnswer("")
  
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest"
      })
  
      const prompt = `
  You are a car rental assistant.
  Answer ONLY using the information below.
  If the answer is not present, say "I don't have that information".
  
  INFORMATION:
  ${knowledgeBase}
  
  QUESTION:
  ${question}
  `
  
      const result = await model.generateContent(prompt)
      const reply = result.response.text()
  
      setAnswer(reply)
      setLoading(false)
    }
  
    return (
      <div>
        <input
          type="text"
          placeholder="Ask about cars, prices, rules..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
  
        <button onClick={askQuestion} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
  
        {answer && (
          <div style={{ marginTop: 16 }}>
            <strong>Answer:</strong>
            <p>{answer}</p>
          </div>
        )}
      </div>
    )
  }