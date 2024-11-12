'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStep, setResponse } from '../redux/reducers/questionnaireReducer'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import NikeOrangeShoe from '../assets/images/nikeOrangeShoe.svg'
import NikeBlackShoe from '../assets/images/nikeBlackShoe.svg'
import { RootState } from '../types/types'

export default function QuestionPage1() {
  const dispatch = useDispatch()
  const router = useRouter()
  const email = useSelector((state: RootState) => state.questionnaire.email)
  const existingResponse = useSelector((state: RootState) => state.questionnaire.responses.step1)
  const [selectedOption, setSelectedOption] = useState<string>(existingResponse || '')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    console.log("Email in QuestionPage1:", email)
    if (!email) {
      // router.push('/')
      console.log("no email");
    }
  }, [email, router])

  const handleNext = async () => {
    if (!selectedOption) {
      setShowError(true)
      return
    }

    dispatch(setResponse({ step: 'step1', response: selectedOption }))
    dispatch(setStep(2))
    
    try {
      await fetch('/api/save-progress', {
        method: 'POST',
        body: JSON.stringify({ email, step: 1, response: { answer: selectedOption } }),
        headers: { 'Content-Type': 'application/json' },
      })
      router.push('/question2')
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  // if (!email) return null

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-[#4D4D4D] to-[#010101] px-4 py-8">
      <div className="w-full max-w-4xl px-[5rem] main-container-ques1">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Question 1</h2>
          <h1 className="text-2xl font-bold text-white sm:text-4xl">What is your preferred choice?</h1>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <button
            onClick={() => {
              setSelectedOption('Nike Orange')
              setShowError(false)
            }}
            className={`group relative rounded-2xl bg-gray-600 p-6 transition-all hover:bg-gray-500 ${
              selectedOption === 'Nike Orange' ? 'ring-2 ring-white' : ''
            }`}
          >
            <div className="absolute right-4 top-4 h-4 w-4 rounded-full border-2 border-white">
              <div
                className={`h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-white transition-all ${
                  selectedOption === 'Nike Orange' ? 'scale-100' : 'scale-0'
                }`}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mb-4 text-xl font-semibold text-white">Nike Orange</h3>
              <Image
                src={NikeOrangeShoe}
                alt="Nike Orange Shoe"
                width={200}
                height={200}
                className="transition-transform group-hover:scale-105"
              />
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedOption('Nike Black')
              setShowError(false)
            }}
            className={`group relative rounded-2xl bg-gray-600 p-6 transition-all hover:bg-gray-500 ${
              selectedOption === 'Nike Black' ? 'ring-2 ring-white' : ''
            }`}
          >
            <div className="absolute right-4 top-4 h-4 w-4 rounded-full border-2 border-white">
              <div
                className={`h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-white transition-all ${
                  selectedOption === 'Nike Black' ? 'scale-100' : 'scale-0'
                }`}
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mb-4 text-xl font-semibold text-white">Nike Black</h3>
              <Image
                src={NikeBlackShoe}
                alt="Nike Black Shoe"
                width={200}
                height={200}
                className="transition-transform group-hover:scale-105"
              />
            </div>
          </button>
        </div>

        {showError && (
          <p className="mb-6 text-center text-sm font-medium text-red-500">Please select one</p>
        )}

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full bg-pink-300 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-pink-400"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-[#c2f24b] px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-[#b3e340]"
          >
            Next
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
