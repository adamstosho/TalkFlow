import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, Mic, Zap, Download, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white font-['Lexend_Deca']">TalkFlow</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/meeting">Try Demo</Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-['Lexend_Deca']">
            Visualize Conversations. <span className="text-indigo-500">Think in Diagrams.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Transform your voice into dynamic mind maps, flowcharts, and outlines in real-time. Perfect for visual
            thinkers, brainstorming sessions, and meeting notes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 text-lg rounded-xl"
              asChild
            >
              <Link href="/meeting">
                <Mic className="w-5 h-5 mr-2" />
                Start Visualizing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg rounded-xl bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Speak Naturally</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Just talk - no special commands needed</p>
                </div>
                <div className="space-y-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Watch It Build</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">See your ideas become visual diagrams</p>
                </div>
                <div className="space-y-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Export & Share</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Save as PNG, PDF, or text format</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 font-['Lexend_Deca']">
            Powerful Features for Visual Thinking
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Real-time Transcription</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced speech recognition converts your voice to text instantly with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Smart Visualization</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  AI automatically creates mind maps, flowcharts, and outlines from your speech patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Multiple Export Formats</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Export your visual diagrams as PNG images, PDF documents, or plain text.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Process and visualize your thoughts in real-time with minimal latency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Collaboration Ready</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Perfect for team meetings, brainstorming sessions, and collaborative planning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Visual Learning</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Transform complex ideas into clear, visual representations for better understanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20">
          <div className="bg-indigo-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4 font-['Lexend_Deca']">Ready to Transform Your Conversations?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of visual thinkers who are already using TalkFlow to make their ideas come alive.
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-500 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl"
              asChild
            >
              <Link href="/meeting">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
