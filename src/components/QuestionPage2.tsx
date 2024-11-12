'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStep, setResponse } from '../redux/reducers/questionnaireReducer'
import { useRouter } from 'next/router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { RootState } from '../types/types'

export default function QuestionPage2() {
  const dispatch = useDispatch()
  const router = useRouter()
  const email = useSelector((state: RootState) => state.questionnaire.email)
  const existingResponse = useSelector((state: RootState) => state.questionnaire.responses.step2)

  const [comfortScore, setComfortScore] = useState<number>(existingResponse?.Comfort || 0)
  const [looksScore, setLooksScore] = useState<number>(existingResponse?.Looks || 0)
  const [priceScore, setPriceScore] = useState<number>(existingResponse?.Price || 0)
  const [showErrors, setShowErrors] = useState(false)

  useEffect(() => {
    console.log("Email in QuestionPage2:", email)
    if (!email) {
      router.push('/')
      console.log("no email");
    }
  }, [email, router])

  const handleNext = async () => {
    if (!comfortScore || !looksScore || !priceScore) {
      setShowErrors(true)
      return
    }

    const response = {
      Comfort: comfortScore,
      Looks: looksScore,
      Price: priceScore,
    }

    dispatch(setResponse({ step: 'step2', response }))
    dispatch(setStep(3))

    try {
      await fetch('https://new-express-sample-server.vercel.app/api/save-progress', {
        method: 'POST',
        body: JSON.stringify({
          email,
          step: 2,
          response,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      router.push('/thank-you')
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  const handleBack = () => {
    router.push('/question1')
  }

  const RatingScale = ({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) => (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between rounded-full bg-white px-6 py-3">
        <span className="text-lg font-semibold text-gray-900">{label}</span>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => {
                onChange(score)
                setShowErrors(false)
              }}
              className="group relative"
            >
              <div className="h-4 w-4 rounded-full border-2 border-gray-400 transition-colors group-hover:border-gray-600">
                <div
                  className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900 transition-transform ${
                    value === score ? 'scale-100' : 'scale-0'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      {showErrors && !value && (
        <p className="text-sm font-medium text-red-500">Please select a score</p>
      )}
    </div>
  )

  // if (!email) return null

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-[#4D4D4D] to-[#010101] px-[12rem] pt-[3rem] pb-[1rem] question2-main-container">
      <div className="w-full max-w-2xl ">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">Question 2</h2>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">How important are these aspects for you?</h1>
        </div>

        <div className="mb-8">
          <RatingScale label="Comfort" value={comfortScore} onChange={setComfortScore} />
          <RatingScale label="Looks" value={looksScore} onChange={setLooksScore} />
          <RatingScale label="Price" value={priceScore} onChange={setPriceScore} />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full bg-pink-300 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-pink-400"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100"
          >
            Send
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
