"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import * as faceapi from "face-api.js";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/app/utils/GeminiAIModal.js";
import { db } from "@/app/utils/db";
import { UserAnswer } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState({ positivity: 0, uncomfortable: 0, happy: 0 });
  const [attention, setAttention] = useState(0);
  const [ageRange, setAgeRange] = useState("N/A");
  const [micActivity, setMicActivity] = useState(0); // New state for mic activity

  const webcamRef = useRef(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });

  useEffect(() => {
    results?.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Based on the question and user answer, please give feedback and rating in JSON format.";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  const loadModels = async () => {
    const MODEL_URL = '/models'; // Ensure this is correct
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  useEffect(() => {
    loadModels();
  }, []);

  const detectFaceData = async () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;

      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections) {
        const { expressions, age } = detections;

        let positivity = 0;
        let attention = 0;
        let uncomfortable = 0;

        if (expressions.happy > 0.5 && expressions.neutral > 0.5) {
          positivity = 100;
          attention = 100;
        } else if (
          expressions.surprised > 0.3 &&
          (expressions.angry > 0.2 || expressions.fearful > 0.2)
        ) {
          uncomfortable = 100;
        } else {
          positivity = Math.floor((expressions.happy + expressions.surprised + expressions.neutral) * 70);
          attention = Math.floor(expressions.neutral * 100);
          uncomfortable = Math.floor(expressions.sad * 100);
        }

        setEmotion({
          positivity,
          uncomfortable,
          happy: expressions.happy * 100,
        });
        setAttention(attention);
        setAgeRange(`${Math.floor(age - 5)}-${Math.ceil(age + 5)}`);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(detectFaceData, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let micInterval;
    if (isRecording) {
      micInterval = setInterval(() => {
        const randomActivity = Math.floor(Math.random() * 100); // Simulate mic activity
        setMicActivity(randomActivity);
      }, 200);
    } else {
      setMicActivity(0);
    }

    return () => clearInterval(micInterval);
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Webcam
          mirrored={true}
          ref={webcamRef}
          style={{
            height: 300,
            width: 400,
            zIndex: 10,
          }}
          onUserMediaError={(error) => console.log("Webcam Error: ", error)}
        />
        <div className="bg-gray-800 text-white p-4 rounded-lg mt-5 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">Face Analysis</h3>
          <div className="mt-3">
            <p>Attention: {attention}%</p>
            <div className="w-full bg-gray-600 h-3 rounded-md">
              <div
                className="bg-green-500 h-3 rounded-md"
                style={{ width: `${attention}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-3">
            <p>Positivity: {emotion.positivity}%</p>
            <div className="w-full bg-gray-600 h-3 rounded-md">
              <div
                className="bg-yellow-400 h-3 rounded-md"
                style={{ width: `${emotion.positivity}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-3">
            <p>Uncomfortable: {emotion.uncomfortable}%</p>
            <div className="w-full bg-gray-600 h-3 rounded-md">
              <div
                className="bg-red-500 h-3 rounded-md"
                style={{ width: `${emotion.uncomfortable}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-3">
            <p>Microphone Activity: {micActivity}%</p>
            <div className="w-full bg-gray-600 h-3 rounded-md">
              <div
                className="bg-blue-500 h-3 rounded-md"
                style={{ width: `${micActivity}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
