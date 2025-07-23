"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Trophy, Target, BarChart3 } from "lucide-react"
import {
  englishQuestions,
  reasoningQuestions,
  quantitativeQuestions,
  answerKeys,
  sectionMaxScores,
} from "@/data/english-questions"

interface Answer {
  questionId: number
  selectedOption: string
  sectionId: number
}

interface TestResultsProps {
  answers: Answer[]
  onRetakeTest: () => void
}

export default function TestResults({ answers, onRetakeTest }: TestResultsProps) {
  const sections = [
    { id: 1, name: "Reasoning Ability", questions: reasoningQuestions, maxScore: 50 },
    { id: 2, name: "English Language", questions: englishQuestions, maxScore: 25 },
    { id: 3, name: "Quantitative Aptitude", questions: quantitativeQuestions, maxScore: 50 },
  ]

  const calculateSectionResults = (sectionId: number) => {
    const sectionAnswers = answers.filter((a) => a.sectionId === sectionId)
    const sectionKey = sectionId === 1 ? "reasoning" : sectionId === 2 ? "english" : "quantitative"
    const answerKey = answerKeys[sectionKey]

    let correct = 0
    let incorrect = 0
    let unanswered = 0

    for (let i = 1; i <= 50; i++) {
      const userAnswer = sectionAnswers.find((a) => a.questionId === i)
      if (!userAnswer) {
        unanswered++
      } else if (userAnswer.selectedOption === answerKey[String(i)]) {
        correct++
      } else {
        incorrect++
      }
    }

    // Calculate score with negative marking (-0.25 for wrong answers)
    const score = Math.max(0, correct - incorrect * 0.25)
    const maxScore = sectionMaxScores[sectionId]
    const percentage = (score / maxScore) * 100

    return { correct, incorrect, unanswered, score, maxScore, percentage }
  }

  const getOverallResults = () => {
    let totalCorrect = 0
    let totalIncorrect = 0
    let totalUnanswered = 0
    let totalScore = 0
    const totalMaxScore = 125 // 50 + 25 + 50

    sections.forEach((section) => {
      const result = calculateSectionResults(section.id)
      totalCorrect += result.correct
      totalIncorrect += result.incorrect
      totalUnanswered += result.unanswered
      totalScore += result.score
    })

    const overallPercentage = (totalScore / totalMaxScore) * 100

    return {
      totalCorrect,
      totalIncorrect,
      totalUnanswered,
      totalScore,
      totalMaxScore,
      overallPercentage,
    }
  }

  const getQuestionResult = (sectionId: number, questionId: number) => {
    const sectionKey = sectionId === 1 ? "reasoning" : sectionId === 2 ? "english" : "quantitative"
    const correctAnswer = answerKeys[sectionKey][questionId]
    const userAnswer = answers.find((a) => a.sectionId === sectionId && a.questionId === questionId)

    return {
      correctAnswer,
      userAnswer: userAnswer?.selectedOption || null,
      isCorrect: userAnswer?.selectedOption === correctAnswer,
      isAnswered: !!userAnswer,
    }
  }

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-50" }
    if (percentage >= 60) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-50" }
    if (percentage >= 40) return { level: "Average", color: "text-yellow-600", bgColor: "bg-yellow-50" }
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-50" }
  }

  const overallResults = getOverallResults()
  const performanceLevel = getPerformanceLevel(overallResults.overallPercentage)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
          <p className="text-lg text-gray-600">IBPS Mock Test Performance Analysis</p>
        </div>

        {/* Overall Performance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{overallResults.totalScore.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Score</div>
                <div className="text-xs text-gray-500">out of {overallResults.totalMaxScore}</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {overallResults.overallPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
                <Badge className={`mt-1 ${performanceLevel.bgColor} ${performanceLevel.color}`}>
                  {performanceLevel.level}
                </Badge>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">{overallResults.totalCorrect}</div>
                <div className="text-sm text-gray-600">Correct</div>
                <div className="text-xs text-gray-500">+1 mark each</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1">{overallResults.totalIncorrect}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
                <div className="text-xs text-gray-500">-0.25 mark each</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{overallResults.overallPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={overallResults.overallPercentage} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Correct: {overallResults.totalCorrect}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Incorrect: {overallResults.totalIncorrect}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span>Unanswered: {overallResults.totalUnanswered}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section-wise Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Section-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sections.map((section) => {
                const result = calculateSectionResults(section.id)
                const sectionPerformance = getPerformanceLevel(result.percentage)

                return (
                  <div key={section.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg">
                        Section {section.id}: {section.name}
                      </h3>
                      <Badge className={`${sectionPerformance.bgColor} ${sectionPerformance.color}`}>
                        {sectionPerformance.level}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.score.toFixed(2)}</div>
                        <div className="text-xs text-gray-600">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{result.percentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Percentage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{result.correct}</div>
                        <div className="text-xs text-gray-600">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{result.incorrect}</div>
                        <div className="text-xs text-gray-600">Incorrect</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">{result.unanswered}</div>
                        <div className="text-xs text-gray-600">Unanswered</div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Section Progress</span>
                        <span>{result.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={result.percentage} className="h-2" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Question Analysis */}
        {sections.map((section) => (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Section {section.id}: {section.name} - Detailed Analysis
                <Badge variant="secondary">
                  {answers.filter((a) => a.sectionId === section.id).length}/50 Attempted
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.questions.map((question, index) => {
                  const result = getQuestionResult(section.id, index + 1)

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium flex-1">
                          Q{index + 1}. {question.question}
                        </h4>
                        <div className="flex items-center gap-2 ml-4">
                          {result.isAnswered ? (
                            result.isCorrect ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Correct
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">
                                <XCircle className="h-3 w-3 mr-1" />
                                Incorrect
                              </Badge>
                            )
                          ) : (
                            <Badge className="bg-orange-100 text-orange-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Not Answered
                            </Badge>
                          )}
                        </div>
                      </div>

                      {question.passage && (
                        <div className="bg-blue-50 p-3 rounded mb-3 text-sm">
                          <strong>Passage:</strong> {question.passage}
                        </div>
                      )}

                      {question.directions && (
                        <div className="bg-yellow-50 p-3 rounded mb-3 text-sm">
                          <strong>Directions:</strong> {question.directions}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option) => {
                          const isCorrect = option.key === result.correctAnswer
                          const isSelected = option.key === result.userAnswer

                          let className = "p-3 rounded text-sm border "

                          if (isCorrect && isSelected) {
                            className += "bg-green-100 border-green-300 text-green-800"
                          } else if (isCorrect) {
                            className += "bg-green-50 border-green-200 text-green-700"
                          } else if (isSelected) {
                            className += "bg-red-100 border-red-300 text-red-800"
                          } else {
                            className += "bg-gray-50 border-gray-200"
                          }

                          return (
                            <div key={option.key} className={className}>
                              <span className="font-medium">({option.key})</span> {option.text}
                              <div className="flex gap-1 mt-1">
                                {isCorrect && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                    Correct Answer
                                  </Badge>
                                )}
                                {isSelected && (
                                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                    Your Answer
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Button onClick={onRetakeTest} size="lg">
            Take Test Again
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.print()}>
            Print Results
          </Button>
        </div>
      </div>
    </div>
  )
}
