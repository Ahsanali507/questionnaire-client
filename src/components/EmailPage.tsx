'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEmail, setStatus } from '../redux/reducers/questionnaireReducer'
import Image from 'next/image'
import { ArrowRight, Loader2 } from 'lucide-react'
import ArrowSvg from '../assets/images/arrow.svg'
import ShoesSvg from '../assets/images/shows.svg'
import ShadowSvg from '../assets/images/shadow.svg'
import { toast } from 'react-toastify'

export default function EmailPage() {
  const [emailInput, setEmailInput] = useState('')
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      if (!emailInput) {
        setShowError(true)
        return
      }
      setIsLoading(true)
      const response = await fetch('https://new-express-sample-server.vercel.app/api/check-status', {
        method: 'POST',
        body: JSON.stringify({ email: emailInput }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      const data = await response.json()
      console.log(data);

      if (!response.ok) {
        if (response.status === 400) {
          toast.error("Network error! please try again");
          return
        }
        throw new Error('Network response was not ok');
      }

      dispatch(setEmail(emailInput))
      dispatch(setStatus(data.status))

      if (data.status === 'completed') {
        window.location.href = '/thank-you'
      } else if (data.status === 'in-progress') {
        if (data.progress.step1) {
          window.location.href = '/question1'
        }
        else {
          window.location.href = '/question2'
        }
      } else {
        window.location.href = '/question1'
      }
    } catch (error) {
      console.error('Error checking status:', error)
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4D4D4D] to-[#010101] email-main-container">
      {/* <ToastContainer/> */}
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-between px-4 email-left-container">
        <div className="relative flex w-1/2 items-center justify-center email-left-sub">
          <div className="relative h-[494px] w-[494px]">
            <div className="absolute inset-0">
              <Image
                src={ArrowSvg}
                alt="Arrow"
                width={192}
                height={192}
                className="absolute left-[22%] top-[10%] w-[12rem] h-[12rem]"
              />
              <Image
                src={ShoesSvg}
                alt="Arrow"
                width={288}
                height={240}
                className="absolute left-[15%] top-[25%] h-15 w-18"
              />
              <Image
                src={ShadowSvg}
                alt="Arrow"
                width={9}
                height={40}
                className="absolute bottom-[15%] left-[22%] h-[2.5rem] w-[53%]"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-8 pr-[6.5rem] email-right-sub">
          <h1 className="text-5xl font-bold text-white heading">Questionnaire</h1>

          <div className="rounded-3xl bg-pink-300 bg-opacity-90 p-6 text-justify">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">Welcome!</h2>
            <p className="text-gray-700 font-semibold text-xs">
              We&apos;re excited to hear your thoughts, ideas, and insights. Don&apos;t worry about right or wrong answers—just
              speak from the heart.
            </p>
            <p className=" text-gray-700 font-semibold text-xs">Your genuine feedback is invaluable to us!</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setShowError(false);
                }}
                placeholder="Enter email address"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {showError && (
              <p className="mb-6 text-left text-sm font-medium text-red-500">Please enter email</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group flex w-full items-center justify-between rounded-full bg-[#c2f24b] px-6 py-3 text-lg font-semibold text-gray-900 transition-all hover:bg-[#b3e340] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Start Survey</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
