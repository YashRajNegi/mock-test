"use client"

import TestResults from "@/components/test-results"

interface Answer {
  questionId: number
  selectedOption: string
  sectionId: number
}

interface AnswerSheetProps {
  answers: Answer[]
}

export default function AnswerSheet({ answers }: AnswerSheetProps) {
  return <TestResults answers={answers} onRetakeTest={() => window.location.reload()} />
}
