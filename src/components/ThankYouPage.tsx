import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { resetResponses, setStatus } from '../redux/reducers/questionnaireReducer';
import ArrowSvg from '../assets/images/arrow.svg'
import ShoesSvg from '../assets/images/shows.svg'
import ShadowSvg from '../assets/images/shadow.svg'
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThankYouPage = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { email, responses } = useSelector((state: RootState) => state.questionnaire);

  useEffect(() => {
    const completeSurvey = async () => {
      await fetch('https://new-sample-expresss.vercel.app/api/complete-survey', {
        method: 'POST',
        body: JSON.stringify({ email, finalData: responses }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      dispatch(setStatus('completed'));
      dispatch(resetResponses());
    };
    completeSurvey();
    toast.success("Thank you for completing you survey!");
  }, [dispatch, email, responses]);

  const handleBack = () => {
    router.push('/question2')
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4D4D4D] to-[#010101]">
      {/* <ToastContainer/> */}
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-between px-4 thankyou-main">
        <div className="relative flex w-1/2 items-center justify-center thankyou-left">
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

        <div className="w-1/2 space-y-2 pr-[6.5rem] thankyou-right">
          <h1 className="text-5xl font-bold text-white">Thank You</h1>
          <p className=" text-gray-400 font-semibold text-sm text-right">for your feedback!</p>

          <div className="flex">
            <button
              onClick={handleBack}
              className="group flex w-[40%] h-[50px] items-center justify-between rounded-full bg-pink-300 px-[1.5rem] text-lg font-semibold text-gray-900 transition-all hover:bg-pink-400"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={handleBackToHome}
              className="group flex w-[60%] h-[50px] ml-[25px] items-center justify-between rounded-full bg-white px-[1.5rem] text-lg font-semibold text-gray-900 transition-all"
            >
              Back to home
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
