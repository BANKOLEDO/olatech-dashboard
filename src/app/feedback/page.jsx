"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizonal, CheckCircle2, RotateCcw, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Basic validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.feedback.trim()) {
      newErrors.feedback = "Feedback cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Shake animation for invalid form
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power2.inOut" }
      );
      return;
    }

    gsap.to(formRef.current, {
      opacity: 0,
      rotateX: 20,
      y: -20,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setSubmitted(true);

        gsap.fromTo(
          ".confirmation",
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
      },
    });
  };

  const handleGoBack = () => {
    gsap.to(".confirmation", {
      opacity: 0,
      scale: 0.9,
      y: -20,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSubmitted(false);

        gsap.fromTo(
          formRef.current,
          { opacity: 0, rotateX: -20, y: 30 },
          { opacity: 1, rotateX: 0, y: 0, duration: 0.7, ease: "power3.out" }
        );
      },
    });
  };

  return (
    <div ref={containerRef} className="relative p-6 md:p-12 space-y-4">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-700/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Title */}
      <h1 className=" flex flex-row gap-2 items-center justify-center text-xl md:text-2xl font-bold text-center">
        We Value Your Feedback <MessageSquare className="w-5 h-5" />
      </h1>

      {/* Card */}
      <Card className="form-card">
        <CardContent className="p-8 md:p-12">
          {!submitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`peer w-full rounded-xl border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } bg-white/70 px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`peer w-full rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } bg-white/70 px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div className="relative">
                <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Feedback:
                  </label>
                <textarea
                  id="feedback"
                  value={form.feedback}
                  onChange={(e) =>
                    setForm({ ...form, feedback: e.target.value })
                  }
                  className={`peer w-full rounded-xl border ${
                    errors.feedback ? "border-red-500" : "border-gray-300"
                  } bg-white/70 px-4 pt-5 pb-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                  rows={5}
                  placeholder="Your Feedback"
                />
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.feedback}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                ref={btnRef}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white shadow-xl py-4 text-lg font-semibold tracking-wide"
              >
                <SendHorizonal className="w-5 h-5" />
                Send Feedback
              </Button>
            </form>
          ) : (
            <div className="confirmation flex flex-col items-center justify-center py-12 space-y-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-2xl font-bold text-gray-700 text-center">
                Feedback received!
              </p>
              <p className="text-gray-500 text-center">
                Thanks for helping us improve
              </p>

              {/* Back Button */}
              <Button
                onClick={handleGoBack}
                className="flex items-center gap-2 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-medium shadow-md"
              >
                <RotateCcw className="w-5 h-5" />
                Back to Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
