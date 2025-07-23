"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { englishQuestions as defaultEnglishQuestions, reasoningQuestions as defaultReasoningQuestions, quantitativeQuestions as defaultQuantQuestions, answerKeys as defaultAnswerKeys, sectionMaxScores } from "@/data/english-questions"
import TestResults from "./test-results"
import { useRouter } from "next/navigation"

interface Answer {
  questionId: number
  selectedOption: string
  sectionId: number
}

interface TestInterfaceProps {
  mockId?: string
  secureMode?: boolean
  reasoningQuestions?: any[]
  reasoningAnswerKey?: Record<number, string>
  englishQuestions?: any[]
  englishAnswerKey?: Record<number, string>
  quantQuestions?: any[]
  quantAnswerKey?: Record<number, string>
}

export default function TestInterface({
  mockId = "mock-1",
  secureMode = false,
  reasoningQuestions,
  reasoningAnswerKey,
  englishQuestions,
  englishAnswerKey,
  quantQuestions,
  quantAnswerKey,
}: TestInterfaceProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [timeLeft, setTimeLeft] = useState(40 * 60) // 40 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false)
  const [sectionCompleted, setSectionCompleted] = useState<number[]>([])
  // Add review state
  const [reviewed, setReviewed] = useState<{ [key: string]: boolean }>({})
  const [showSectionConfirm, setShowSectionConfirm] = useState(false)
  const [pendingSectionComplete, setPendingSectionComplete] = useState(false)
  const [violationCount, setViolationCount] = useState(0)
  const [showCheatModal, setShowCheatModal] = useState(false)
  const violationReason = useRef("")
  const alertedRef = useRef(false)

  // Secure mode: block tab switch, back nav, full-screen exit, forbidden keys, right-click
  useEffect(() => {
    if (!secureMode) return
    // Helper to block test
    const blockTest = (reason: string) => {
      if (testCompleted) return;
      violationReason.current = reason
      setViolationCount((v) => v + 1)
      setShowCheatModal(true)
    }
    // Tab switch
    const handleVisibility = () => {
      if (testCompleted) return;
      if (document.visibilityState === "hidden") {
        blockTest("Tab/window switch detected!")
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)
    // Window blur
    const handleBlur = () => {
      if (testCompleted) return;
      blockTest("Window focus lost!")
    }
    window.addEventListener("blur", handleBlur)
    // Full-screen exit
    const handleFullscreen = () => {
      if (testCompleted) return;
      if (!document.fullscreenElement) {
        blockTest("Full-screen mode exited!")
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreen)
    // Forbidden keys
    const forbiddenKeys = [
      "F11", // exit full screen
      "Escape", // exit full screen
      "Tab", // tab switch
      "Alt", "Control", "Meta", // system keys
    ]
    const handleKeyDown = (e: KeyboardEvent) => {
      if (testCompleted) return;
      if (
        forbiddenKeys.includes(e.key) ||
        (e.ctrlKey && e.key === "Tab") ||
        (e.altKey && e.key === "Tab") ||
        (e.metaKey && e.key === "Tab")
      ) {
        e.preventDefault()
        blockTest("Forbidden key/gesture detected!")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    // Block right-click/context menu
    const handleContextMenu = (e: MouseEvent) => {
      if (testCompleted) return;
      e.preventDefault()
      blockTest("Right-click/context menu is disabled!")
    }
    window.addEventListener("contextmenu", handleContextMenu)
    // Back nav
    const handlePopState = (e: PopStateEvent) => {
      if (testCompleted) return;
      e.preventDefault()
      window.history.pushState(null, "", window.location.href)
      blockTest("Back navigation is disabled during the test.")
    }
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
      window.removeEventListener("blur", handleBlur)
      document.removeEventListener("fullscreenchange", handleFullscreen)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("contextmenu", handleContextMenu)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [secureMode, testCompleted])

  // If 3 violations, auto-submit/end test
  useEffect(() => {
    if (secureMode && violationCount >= 3 && !alertedRef.current) {
      setTestCompleted(true)
      setShowCheatModal(false)
      alertedRef.current = true
      alert("Test ended due to repeated violations.")
    }
  }, [violationCount, secureMode])

  // Handler to re-enter full screen and resume
  const handleResumeTest = () => {
    setShowCheatModal(false)
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
    window.focus()
  }

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`ibps-mock-progress-${mockId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.answers) setAnswers(data.answers)
        if (data.reviewed) setReviewed(data.reviewed)
        if (data.currentSection) setCurrentSection(data.currentSection)
        if (data.currentQuestion !== undefined) setCurrentQuestion(data.currentQuestion)
      } catch {}
    }
  }, [])

  // Save progress to localStorage on every change
  useEffect(() => {
    localStorage.setItem(
      `ibps-mock-progress-${mockId}`,
      JSON.stringify({
        answers,
        reviewed,
        currentSection,
        currentQuestion,
      })
    )
  }, [answers, reviewed, currentSection, currentQuestion])

  // On test complete, clear progress and save to pastMocks
  useEffect(() => {
    if (testCompleted) {
      // Save to pastMocks
      const past = localStorage.getItem(`ibps-mock-past-records-${mockId}`)
      let pastMocks = []
      try {
        if (past) pastMocks = JSON.parse(past)
      } catch {}
      pastMocks.push({
        date: new Date().toISOString(),
        answers,
        reviewed,
        section: currentSection,
      })
      localStorage.setItem(`ibps-mock-past-records-${mockId}`, JSON.stringify(pastMocks))
      // Clear current progress
      localStorage.removeItem(`ibps-mock-progress-${mockId}`)
    }
  }, [testCompleted])

  // Removed the useEffect that redirected to /mock/[id]/results after test completion.

  useEffect(() => {
    if (testCompleted && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, [testCompleted]);

  const sections = [
    { id: 1, name: "Reasoning Ability", questions: 50, timeMinutes: 40 },
    { id: 2, name: "English Language", questions: 50, timeMinutes: 40 },
    { id: 3, name: "Quantitative Aptitude", questions: 50, timeMinutes: 40 },
  ]

  // Section data selection
  const getCurrentQuestions = () => {
    if (currentSection === 1) {
      return reasoningQuestions || defaultReasoningQuestions
    } else if (currentSection === 2) {
      return englishQuestions || defaultEnglishQuestions
    } else if (currentSection === 3) {
      return quantQuestions || defaultQuantQuestions
    }
    return []
  }
  const getCurrentAnswerKey = () => {
    if (currentSection === 1) {
      return reasoningAnswerKey || (defaultAnswerKeys && defaultAnswerKeys.reasoning)
    } else if (currentSection === 2) {
      return englishAnswerKey || (defaultAnswerKeys && defaultAnswerKeys.english)
    } else if (currentSection === 3) {
      return quantAnswerKey || (defaultAnswerKeys && defaultAnswerKeys.quantitative)
    }
    return {}
  }

  const currentQuestions = getCurrentQuestions()

  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSectionComplete()
    }
  }, [timeLeft, testCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionId: number, option: string) => {
    const newAnswer: Answer = {
      questionId,
      selectedOption: option,
      sectionId: currentSection,
    }

    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId || a.sectionId !== currentSection)
      return [...filtered, newAnswer]
    })
  }

  const getSelectedAnswer = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId && a.sectionId === currentSection)?.selectedOption || ""
  }

  // On section complete, show confirm popup if secureMode
  const handleSectionComplete = () => {
    if (secureMode) {
      setShowSectionConfirm(true)
      setPendingSectionComplete(true)
    } else {
      setSectionCompleted((prev) => [...prev, currentSection])
      if (currentSection < 3) {
        setCurrentSection(currentSection + 1)
        setCurrentQuestion(0)
        setTimeLeft(40 * 60)
      } else {
        setTestCompleted(true)
      }
    }
  }
  // Confirm section submit
  const confirmSectionSubmit = () => {
    setShowSectionConfirm(false)
    setPendingSectionComplete(false)
    setSectionCompleted((prev) => [...prev, currentSection])
    if (currentSection < 3) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
      setTimeLeft(40 * 60)
    } else {
      setTestCompleted(true)
    }
  }
  // Cancel section submit
  const cancelSectionSubmit = () => {
    setShowSectionConfirm(false)
    setPendingSectionComplete(false)
  }

  const getQuestionStatus = (index: number) => {
    const questionId = index + 1
    const hasAnswer = answers.some((a) => a.questionId === questionId && a.sectionId === currentSection)

    if (index === currentQuestion) return "current"
    if (hasAnswer) return "answered"
    return "unanswered"
  }

  // Add clear answer handler
  const handleClearAnswer = (questionId: number) => {
    setAnswers((prev) => prev.filter((a) => !(a.questionId === questionId && a.sectionId === currentSection)))
  }

  // Add mark as review handler
  const handleMarkAsReview = (questionId: number) => {
    setReviewed((prev) => ({
      ...prev,
      [`${currentSection}-${questionId}`]: !prev[`${currentSection}-${questionId}`],
    }))
  }

  const currentQ = currentQuestions[currentQuestion]
  // Helper to get group questions if passage exists
  const getGroupQuestions = () => {
    if (currentQ?.passage) {
      // Find all questions in the same section with the same passage
      const passageText = currentQ.passage
      return currentQuestions.filter(q => q.passage === passageText)
    }
    return null
  }
  const groupQuestions = getGroupQuestions()

  if (testCompleted) {
    return <>
      <div id="test-completed-flag" style={{ display: 'none' }} />
      <TestResults answers={answers} onRetakeTest={() => window.location.reload()} />
    </>;
  }

  // Count unattempted
  const unattemptedCount = currentQuestions.length - answers.filter((a) => a.sectionId === currentSection).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">IBPS Mock Test</h1>
            <p className="text-sm text-gray-600">
              Section {currentSection}: {sections[currentSection - 1].name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className={`text-lg px-3 py-1 transition-all duration-300 ${
                timeLeft <= 60 ? 'border-red-500 animate-pulse text-red-600' : ''
              }`}
            >
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
            {/* Section Complete Button */}
            <Button onClick={handleSectionComplete} variant="outline">
              Complete Section
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestion + 1} of {currentQuestions.length}
                  </CardTitle>
                  <Badge variant="secondary">{currentQ?.section || "General"}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {currentQ && (
                  <div className="space-y-6">
                    {/* If group, show passage and all group questions */}
                    {groupQuestions ? (
                      <>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Passage:</h4>
                          <p className="text-base leading-relaxed">{currentQ.passage}</p>
                        </div>
                        {currentQ.directions && (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Directions:</h4>
                            <p className="text-base">{currentQ.directions}</p>
                      </div>
                    )}
                        <div className="space-y-8">
                          {groupQuestions.map((q, idx) => (
                            <div key={q.id} className="border rounded-lg p-4 bg-white">
                              <h3 className="text-xl font-semibold mb-4">
                                Question {q.id}. {q.question}
                              </h3>
                              <RadioGroup
                                value={getSelectedAnswer(q.id)}
                                onValueChange={(value) => handleAnswerSelect(q.id, value)}
                              >
                                {q.options.map((option: any, index: number) => (
                                  <div
                                    key={`${q.id}-${option.key}-${index}`}
                                    className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 cursor-pointer border ${getSelectedAnswer(q.id) === option.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} text-base`}
                                    onClick={() => handleAnswerSelect(q.id, option.key)}
                                  >
                                    <RadioGroupItem value={option.key} id={`${q.id}-${option.key}-${index}`} />
                                    <Label htmlFor={`${q.id}-${option.key}-${index}`} className="flex-1 cursor-pointer text-base">
                                      <span className="font-medium mr-2">({option.key})</span>
                                      {option.text}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  variant="secondary"
                                  onClick={() => handleClearAnswer(q.id)}
                                  type="button"
                                >
                                  Clear
                                </Button>
                                <Button
                                  variant={reviewed[`${currentSection}-${q.id}`] ? 'destructive' : 'outline'}
                                  onClick={() => handleMarkAsReview(q.id)}
                                  type="button"
                                >
                                  {reviewed[`${currentSection}-${q.id}`] ? 'Unmark Review' : 'Mark as Review'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                    {currentQ.directions && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Directions:</h4>
                            <p className="text-base">{currentQ.directions}</p>
                      </div>
                    )}
                    <div>
                          <h3 className="text-xl font-semibold mb-4">{currentQ.question}</h3>
                      <RadioGroup
                        value={getSelectedAnswer(currentQuestion + 1)}
                        onValueChange={(value) => handleAnswerSelect(currentQuestion + 1, value)}
                      >
                        {currentQ.options.map((option: any, index: number) => (
                              <div
                                key={`${currentQ.id}-${option.key}-${index}`}
                                className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 cursor-pointer border ${getSelectedAnswer(currentQuestion + 1) === option.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} text-base`}
                                onClick={() => handleAnswerSelect(currentQuestion + 1, option.key)}
                              >
                                <RadioGroupItem value={option.key} id={`${currentQ.id}-${option.key}-${index}`} />
                                <Label htmlFor={`${currentQ.id}-${option.key}-${index}`} className="flex-1 cursor-pointer text-base">
                              <span className="font-medium mr-2">({option.key})</span>
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="secondary"
                              onClick={() => handleClearAnswer(currentQuestion + 1)}
                              type="button"
                            >
                              Clear
                            </Button>
                            <Button
                              variant={reviewed[`${currentSection}-${currentQuestion + 1}`] ? 'destructive' : 'outline'}
                              onClick={() => handleMarkAsReview(currentQuestion + 1)}
                              type="button"
                            >
                              {reviewed[`${currentSection}-${currentQuestion + 1}`] ? 'Unmark Review' : 'Mark as Review'}
                            </Button>
                          </div>
                    </div>
                      </>
                    )}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        onClick={() => setCurrentQuestion(Math.min(currentQuestions.length - 1, currentQuestion + 1))}
                        disabled={currentQuestion === currentQuestions.length - 1}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {currentQuestions.map((_, index) => {
                    const status = getQuestionStatus(index)
                    const isReviewed = reviewed[`${currentSection}-${index + 1}`]
                    return (
                      <Button
                        key={index}
                        variant={status === "current" ? "default" : "outline"}
                        size="sm"
                        className={`h-8 w-8 p-0 text-xs relative ${
                          status === "answered" ? "bg-green-100 border-green-300" : ""
                        } ${isReviewed ? "ring-2 ring-yellow-400" : ""}`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                        {isReviewed && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
                        )}
                      </Button>
                    )
                  })}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded border border-white"></div>
                    <span>Marked for Review</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm space-y-1">
                    <div>Answered: {answers.filter((a) => a.sectionId === currentSection).length}</div>
                    <div>
                      Not Answered:{" "}
                      {currentQuestions.length - answers.filter((a) => a.sectionId === currentSection).length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Section Confirm Modal */}
      {showSectionConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-xs mx-auto">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to submit this section?</h2>
            <p className="mb-4 text-lg text-red-600">You have {unattemptedCount} questions not attempted.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={cancelSectionSubmit}>Go Back</Button>
              <Button variant="destructive" onClick={confirmSectionSubmit}>Submit & Proceed</Button>
            </div>
          </div>
        </div>
      )}
      {/* Cheat Modal */}
      {showCheatModal && !testCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-xs mx-auto">
            <h2 className="text-xl font-bold mb-4 text-red-600">Test Paused</h2>
            <p className="mb-4 text-lg text-gray-700">{violationReason.current}</p>
            <p className="mb-4 text-md text-gray-500">Please return to full-screen and focus to continue.<br/>Violations: {violationCount} / 3</p>
            <Button variant="default" onClick={handleResumeTest}>Resume Test</Button>
          </div>
        </div>
      )}
    </div>
  )
}
