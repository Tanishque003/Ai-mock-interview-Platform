import React from 'react'

function AboutUsCard() {
    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl text-center'>About Us</h2>
            <h3 className='text-center text-gray-500 mb-6'>AI-Powered Mock Interview Platform</h3>

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-white rounded-lg shadow-lg">
                <p className='text-lg font-bold mb-4 text-gray-900'>
                    Welcome to Our AI-Powered Mock Interview Platform
                </p>
                <p className='text-justify text-gray-700'>
                    Our platform is designed to help job seekers practice and enhance their interview skills using cutting-edge AI technologies. We simulate realistic interviews, monitor your emotional and behavioral cues, and provide you with personalized feedback to improve your performance.
                </p>

                <p className='text-lg font-bold mt-6 mb-4 text-gray-900'>
                    AI-Driven Interview Simulations
                </p>
                <p className='text-justify text-gray-700'>
                    We leverage Natural Language Processing (NLP) to generate tailored interview questions based on your job title and resume. This allows for a highly personalized interview experience that mimics real-world scenarios.
                </p>

                <p className='text-lg font-bold mt-6 mb-4 text-gray-900'>
                    Real-Time Emotion Detection
                </p>
                <p className='text-justify text-gray-700'>
                    With computer vision technology, we analyze your confidence, composure, and emotional state in real-time during the interview. This helps you understand your non-verbal cues and how they might impact interviewers.
                </p>

                <p className='text-lg font-bold mt-6 mb-4 text-gray-900'>
                    Comprehensive Feedback
                </p>
                <p className='text-justify text-gray-700'>
                    After each session, you will receive detailed feedback including performance scores, behavioral insights, and suggestions for improvement. This enables you to refine your approach before attending actual interviews.
                </p>

                <div className="mt-8 text-center">
                    <a
                        href="/get-started"
                        className="inline-block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Get Started with Mock Interviews
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutUsCard;
