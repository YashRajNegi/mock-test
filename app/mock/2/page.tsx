"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Calculator, Brain } from "lucide-react"
import TestInterface from "@/components/test-interface"
import { englishQuestionsMock2 } from "@/data/mock2-english-questions"
import { quantitativeQuestionsMock2 } from "@/data/mock2-quant-questions"
import { reasoningQuestionsMock2 } from "@/data/mock2-reasoning-questions"

export default function Mock2Page() {
  const [testStarted, setTestStarted] = useState(false)
  const [pastMocks, setPastMocks] = useState<any[]>([])
  const [countdown, setCountdown] = useState(0)
  const [showCountdown, setShowCountdown] = useState(false)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const [acknowledged, setAcknowledged] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    if (typeof window !== "undefined") {
      const past = localStorage.getItem("ibps-mock-past-records-mock-2")
      if (past) {
        try {
          setPastMocks(JSON.parse(past).reverse())
        } catch {}
      }
    }
  }, [testStarted, isClient])

  const handleStartTest = () => {
    if (typeof window !== "undefined" && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
    setShowCountdown(true)
    setCountdown(30)
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current as any)
          setShowCountdown(false)
          setTestStarted(true)
        }
        return prev - 1
      })
    }, 1000)
  }

  const sections = [
    {
      id: 1,
      name: "Reasoning Ability",
      questions: reasoningQuestionsMock2.length,
      maxScore: 50,
      timeMinutes: 40,
      language: "English & Hindi",
      icon: Brain,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "English Language",
      questions: englishQuestionsMock2.length,
      maxScore: 50,
      timeMinutes: 40,
      language: "English",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Quantitative Aptitude",
      questions: quantitativeQuestionsMock2.length,
      maxScore: 50,
      timeMinutes: 40,
      language: "English & Hindi",
      icon: Calculator,
      color: "bg-purple-500",
    },
  ]

  if (!isClient) return null

  if (testStarted) {
    return (
      <TestInterface
        mockId="mock-2"
        secureMode
        reasoningQuestions={reasoningQuestionsMock2}
        englishQuestions={englishQuestionsMock2}
        quantQuestions={quantitativeQuestionsMock2}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mock 2: IBPS Mock Test</h1>
          <p className="text-lg text-gray-600">Banking Personnel Selection Examination</p>
        </div>

        {/* Prominent Anti-Cheat Warning */}
        <Card className="mb-8 border-2 border-red-400 bg-red-50">
          <CardHeader>
            <CardTitle className="text-xl text-red-700">Important Exam Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-md text-red-700 font-semibold">
              <li>• The test will run in full-screen mode. <b>Do not press ESC or F11</b>.</li>
              <li>• <b>Do not switch tabs, windows, or minimize the browser</b>.</li>
              <li>• <b>Do not use keyboard shortcuts</b> (Alt+Tab, Ctrl+Tab, Cmd+Tab, etc.).</li>
              <li>• <b>Do not right-click or use the context menu</b>.</li>
              <li>• <b>Do not use the browser back/forward buttons</b>.</li>
              <li>• <b>Each violation will pause your test and be logged</b>.</li>
              <li>• <b>After 3 violations, your test will be auto-submitted</b>.</li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" id="acknowledge" checked={acknowledged} onChange={e => setAcknowledged(e.target.checked)} />
              <label htmlFor="acknowledge" className="text-red-800 font-bold">I have read and agree to follow these rules</label>
            </div>
          </CardContent>
        </Card>

        {/* Past Attempts Summary */}
        {pastMocks.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Past Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Answered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastMocks.map((attempt, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-3 py-2">{pastMocks.length - idx}</td>
                        <td className="px-3 py-2">{new Date(attempt.date).toLocaleString()}</td>
                        <td className="px-3 py-2">{attempt.answers?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Test Overview
            </CardTitle>
            <CardDescription>Complete examination details and structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">150</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">120</div>
                <div className="text-sm text-gray-600">Minutes (2 Hours)</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">125</div>
                <div className="text-sm text-gray-600">Maximum Score</div>
              </div>
            </div>

            <div className="space-y-4">
              {sections.map((section) => {
                const IconComponent = section.icon
                return (
                  <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${section.color} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Section {section.id}: {section.name}
                        </h3>
                        <p className="text-sm text-gray-600">{section.language}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 mb-1">
                        <Badge variant="outline">{section.questions} Questions</Badge>
                        <Badge variant="outline">{section.timeMinutes} Minutes</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Max Score: {section.maxScore}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Each section has a separate time limit of 40 minutes</li>
              <li>• You cannot go back to previous sections once completed</li>
              <li>• All questions are compulsory</li>
              <li>• There is negative marking: -0.25 for each wrong answer</li>
              <li>• Click on question numbers to navigate within a section</li>
              <li>• Review your answers before submitting each section</li>
              <li>• Final answer sheet will be shown after completing all sections</li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={handleStartTest} size="lg" className="px-8 py-3 text-lg" disabled={!acknowledged}>
            Start Test
          </Button>
        </div>
        {/* Countdown Modal */}
        {showCountdown && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-xs mx-auto">
              <h2 className="text-2xl font-bold mb-4">Get Ready!</h2>
              <div className="text-6xl font-extrabold text-blue-600 mb-2">{countdown}</div>
              <p className="text-lg text-gray-700">The test will start in {countdown} seconds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 