import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuroraBackground } from "../components/AuroraBackground"
import { useAuth } from "../contexts/AuthProvider"

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const pyCode = `class Snippet:
      def __init__(self):
              self.code = "print('DevAllies are awesome!')"`
  const jsCode = `class Snippet {
    constructor() {
        this.code = "console.log('DevAllies are awesome!')";
    }
}`
  const jvCode = `public class Snippet {
    String code;
    public Snippet() {
        code = "System.out.println('DevAllies are awesome!')";
    }
}`
  const cpCode = `class Snippet {
public:
    std::string code;
    Snippet() {
        code = "std::cout << 'DevAllies are awesome!' << std::endl;";
    }
};
`
  const [homeCode, setHomeCode] = useState(pyCode)

  const handleLangClick = (lang) => {
    switch (lang) {
      case "JavaScript":
        setHomeCode(jsCode)
        break
      case "Python":
        setHomeCode(pyCode)
        break
      case "Java":
        setHomeCode(jvCode)
        break
      case "C++":
        setHomeCode(cpCode)
        break
      default:
        setHomeCode(pyCode)
    }
  }

  return (
    <AuroraBackground>
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center ">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 animate-glow " />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 relative z-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-float">
              Code Snippet Snippetly
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Your ultimate solution for managing code fragments with style and
            efficiency
          </p>

          {/* Feature Showcase */}
          <section className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Smart Organization",
                  desc: "Tags, folders, and search",
                },
                { title: "Team Collaboration", desc: "Real-time sharing" },
                { title: "Version History", desc: "Track changes over time" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-gray-700 rounded-xl hover:border-purple-400 transition-all
                duration-300 hover:scale-105 group backdrop-blur-sm bg-gray-900/30 hover:bg-gray-900/50"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0
                  group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2 relative">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 relative">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* Interactive Code Preview */}
        <section className="container mx-auto px-6 py-8">
          <div
            className="border border-gray-700 rounded-2xl p-6 bg-gray-800/50 backdrop-blur-sm
          hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
          >
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {["Python", "JavaScript", "Java", "C++"].map((lang, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:scale-95 duration-200 text-sm md:text-base"
                  onClick={() => handleLangClick(lang)}
                  aria-label={`Switch to ${lang} code`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Animated code block */}
            <div className="mt-6 font-mono text-gray-100 relative">
              <pre className="relative overflow-hidden">
                <code className="block overflow-x-auto scrollbar-hide text-sm md:text-base">
                  {homeCode}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Floating CTA */}
        {!user && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full
            text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl
            shadow-purple-500/30 hover:shadow-purple-500/50"
              onClick={() => navigate("/signup")}
              aria-label="Get Started"
            >
              Get Started Now
            </button>
          </div>
        )}
      </div>
    </AuroraBackground>
  )
}

export default Home
