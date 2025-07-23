"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Trophy } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [lastScore, setLastScore] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    if (typeof window !== "undefined") {
      const past = localStorage.getItem("ibps-mock-past-records-mock-1")
      if (past) {
        try {
          const arr = JSON.parse(past)
          setAttempts(arr.length)
          if (arr.length > 0) {
            // If you store score, use it; else, use answered count
            const scores = arr.map((a: any) => a.score || a.answers?.length || 0)
            setLastScore(scores[scores.length - 1])
            setBestScore(Math.max(...scores))
          }
        } catch {}
      }
    }
  }, [isClient])

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="flex flex-col items-center gap-2">
          <Trophy className="h-14 w-14 text-yellow-400 mb-2" />
          <h1 className="text-4xl font-extrabold text-blue-900 mb-1">Welcome back, Future Banker!</h1>
          <p className="text-lg text-blue-700 mb-2">Sharpen your skills and track your progress with our IBPS mock tests.</p>
        </div>
      </div>

      {/* Progress Snapshot */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">{attempts}</span>
          <span className="text-sm text-gray-600">Total Attempts</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{bestScore !== null ? bestScore : '-'}</span>
          <span className="text-sm text-gray-600">Best Score</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{lastScore !== null ? lastScore : '-'}</span>
          <span className="text-sm text-gray-600">Last Attempt</span>
        </div>
        </div>

      {/* Mock Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="cursor-pointer hover:shadow-2xl transition border-2 border-blue-200 bg-white rounded-2xl relative overflow-hidden" onClick={() => router.push("/mock/1") }>
          <div className="absolute right-4 top-4 bg-blue-100 rounded-full p-2">
            <BarChart3 className="h-7 w-7 text-blue-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Mock 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700 mb-2">Full-length IBPS mock test</div>
            <div className="mb-2">
              <div className="h-2 w-full bg-blue-100 rounded">
                <div className="h-2 rounded bg-blue-400 transition-all" style={{ width: lastScore ? `${Math.min(100, lastScore)}%` : '0%' }} />
              </div>
              <div className="text-xs text-blue-700 mt-1">{lastScore !== null ? `Last Score: ${lastScore}` : "Not attempted yet"}</div>
            </div>
            <Button variant="default" className="mt-4 w-full">Start / Resume</Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-2xl transition border-2 border-green-200 bg-white rounded-2xl relative overflow-hidden" onClick={() => router.push("/mock/2") }>
          <div className="absolute right-4 top-4 bg-green-100 rounded-full p-2">
            <BarChart3 className="h-7 w-7 text-green-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-green-900">Mock 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700 mb-2">Another full-length IBPS mock test</div>
            <div className="mb-2">
              <div className="h-2 w-full bg-green-100 rounded">
                <div className="h-2 rounded bg-green-400 transition-all" style={{ width: '0%' }} />
              </div>
              <div className="text-xs text-green-700 mt-1">Not attempted yet</div>
            </div>
            <Button variant="default" className="mt-4 w-full">Start / Resume</Button>
          </CardContent>
        </Card>
        </div>

      {/* Encouragement */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <p className="text-lg text-green-700 font-semibold">Keep practicing to improve your score! You’re on your way to success 🚀</p>
      </div>
    </div>
  )
}
