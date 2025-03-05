// AIChat.jsx
import { React, useState, useEffect } from "react"
import { infoToast } from "../utils/toast"

export default function AIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    infoToast("This feature will be out soon...")
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CodeGen AI
          </h1>
          <p className="text-gray-400 mt-2">Powered by Advanced AI Models</p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10">
          {/* Messages History */}
          <div className="h-96 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`animate-fade-in-up flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-xl ${
                    message.role === "user"
                      ? "bg-gray-700/50"
                      : "bg-gradient-to-br from-purple-600/20 to-blue-600/20"
                  }`}
                >
                  {message.content}
                  {message.code && (
                    <div className="mt-4 relative group">
                      <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto">
                        <code className="font-mono text-sm text-purple-300">
                          {message.code}
                        </code>
                      </pre>
                      <button className="absolute top-2 right-2 p-2 bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        📋
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center space-x-2 text-purple-400 animate-pulse">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the code you want to generate..."
                className="w-full p-4 bg-gray-900/20 backdrop-blur-sm border border-gray-700 rounded-xl resize-none focus:outline-none focus:border-purple-400 pr-24"
                rows="2"
              />

              {/* Example Prompts */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="px-3 py-1 bg-gray-800/50 text-xs rounded-full hover:bg-purple-500/20 transition-colors">
                  "React counter component"
                </button>
                <button className="px-3 py-1 bg-gray-800/50 text-xs rounded-full hover:bg-purple-500/20 transition-colors">
                  "Python Fibonacci"
                </button>
              </div>

              <button
                className="absolute bottom-4 right-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:scale-105 transition-transform"
                // onClick={handleSend}
              >
                Generate
              </button>
            </div>

            {/* Language Selector */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["JavaScript", "Python", "Java", "C++", "PHP", "Ruby"].map(
                (lang) => (
                  <button
                    key={lang}
                    className="px-3 py-1 text-xs bg-gray-800/50 rounded-full hover:bg-purple-500/20 transition-colors"
                  >
                    {lang}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            {
              title: "Multi-Language",
              desc: "Supports 20+ programming languages",
            },
            {
              title: "Smart Context",
              desc: "Understands complex requirements",
            },
            { title: "Optimized Code", desc: "Production-ready solutions" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-purple-400 transition-all"
            >
              <h3 className="text-purple-400 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
