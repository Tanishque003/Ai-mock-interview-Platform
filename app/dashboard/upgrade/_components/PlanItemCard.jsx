"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

function AboutUsCard() {
  const {user} = useUser();

  return (
    <div className="rounded-2xl border border-gray-300 p-8 shadow-lg max-w-3xl mx-auto bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          About Us
        </h2>
      </div>

      <div className="space-y-6 text-gray-700">
        <p className="text-lg font-bold">
          Welcome to Our AI-Powered Mock Interview Platform
        </p>
        <p className="text-justify">
          Our platform is designed to help job seekers practice and enhance their interview skills using cutting-edge AI technologies. We simulate realistic interviews, monitor your emotional and behavioral cues, and provide you with personalized feedback to improve your performance.
        </p>

        <p className="text-lg font-bold">
          AI-Driven Interview Simulations
        </p>
        <p className="text-justify">
          We leverage Natural Language Processing (NLP) to generate tailored interview questions based on your job title and resume. This allows for a highly personalized interview experience that mimics the real world.
        </p>

        <p className="text-lg font-bold">
          Real-Time Emotion Detection
        </p>
        <p className="text-justify">
          With computer vision technology, we analyze your confidence, composure, and emotional state in real-time during the interview. This helps you understand your non-verbal cues and how they might impact interviewers.
        </p>

        <p className="text-lg font-bold">
          Comprehensive Feedback
        </p>
        <p className="text-justify">
          After each session, you will receive detailed feedback including performance scores, behavioral insights, and suggestions for improvement. This enables you to refine your approach before attending actual interviews.
        </p>

        <p className="text-lg font-bold">
          Prepare for Success
        </p>
        <p className="text-justify">
          Whether you're preparing for technical, behavioral, or managerial roles, our platform provides a comprehensive preparation experience to boost your confidence and performance in interviews.
        </p>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/get-started"
          className="inline-block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Get Started with Mock Interviews
        </a>
      </div>
    </div>
  );
}

export default AboutUsCard;
