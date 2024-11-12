import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="w-full text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to Your AI-Powered Interview Coach</h1>
        <p className="text-xl mb-8">
          Practice with AI-driven mock interviews and gain the confidence to ace your next job opportunity.
        </p>
        <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition duration-200">
          Get Started
        </Link>
      </header>

      {/* How It Works Section */}
      <section className="container mx-auto my-16 p-6">
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">1. Upload Your Resume</h3>
            <p>Start by uploading your resume to tailor your mock interview experience to your profile.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">2. Choose a Job Role</h3>
            <p>Select a job role, and our AI will simulate interview questions relevant to your field.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">3. Receive Feedback</h3>
            <p>Get detailed feedback and actionable tips to refine your answers and body language.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto my-16 p-6">
        <h2 className="text-4xl font-bold text-center mb-10">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Personalized Feedback</h3>
            <p>Receive tailored insights to improve specific areas of your performance.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Real-time Emotion Detection</h3>
            <p>Understand how your expressions and tone influence interview outcomes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Performance Analysis</h3>
            <p>Identify your strengths and areas for improvement with detailed analytics.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Mock Interviews for Any Role</h3>
            <p>Practice for a variety of job roles with customized questions and scenarios.</p>
          </div>
        </div>
      </section>

      {/* Additional Banner Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Your Success, Our Mission</h2>
          <p className="text-lg mb-8">Join thousands of users who have boosted their interview skills and landed their dream jobs.</p>
          <Link href="/dashboard" className="bg-white text-green-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition duration-200">
            Start Practicing Now
          </Link>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="bg-blue-500 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Take the first step towards acing your next interview with our AI-driven platform.
        </p>
        <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition duration-200">
          Get Started
        </Link>
      </footer>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p>Our mission is to help candidates shine by providing realistic mock interviews and actionable feedback.</p>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Interview Tips</a></li>
              <li><a href="#" className="hover:underline">Career Advice</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@mockinterview.com" className="hover:underline">support@mockinterview.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></li>
              <li>Address: 123 Mock Street, Interview City</li>
            </ul>
          </div>
          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto text-center mt-8">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AI Mock Interview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
