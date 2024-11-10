import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <header className="container mx-auto text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold mb-6">Welcome to the AI Mock Interview Platform</h1>
                <p className="text-xl mb-8">
                    Ace your next interview with confidence using our AI-powered mock interview simulations.
                </p>
                <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition duration-200">
                    Get Started
                </Link>
            </header>

            {/* Benefits Section */}
            <section className="container mx-auto my-16 p-6">
                <h2 className="text-4xl font-bold text-center mb-10">Why Choose Our Platform?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h3 className="text-2xl font-semibold mb-4">Personalized Feedback</h3>
                        <p>Receive tailored insights to help you improve specific areas of your performance.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h3 className="text-2xl font-semibold mb-4">Real-time Emotion Detection</h3>
                        <p>Understand how your body language and expressions impact your interview success.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h3 className="text-2xl font-semibold mb-4">Comprehensive Performance Analysis</h3>
                        <p>Review your strengths and weaknesses with detailed feedback reports.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md text-center">
                        <h3 className="text-2xl font-semibold mb-4">Diverse Job Role Simulations</h3>
                        <p>Prepare for a wide variety of job roles with customized interview questions.</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <footer className="bg-blue-500 py-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
                <p className="text-lg mb-8">
                    Join thousands of successful candidates who have aced their interviews with us.
                    </p>
                <Link href="/dashboard" className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-200 transition duration-200">
                    Get Started
                </Link>
            </footer>
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Us */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About Us</h3>
                        <p>
                            Our platform is dedicated to helping job seekers succeed by providing realistic,
                            AI-powered mock interviews and valuable feedback.
                        </p>
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
                            <li>Phone: <a href="tel:+91 9301285187" className="hover:underline">+1 (234) 567-890</a></li>
                            <li>Address: 123 Interview Lane, City, Country</li>
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
