"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SendHorizonal, CheckCircle2, RotateCcw, HelpCircle} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HelpDesk() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef(null);
  const formRef = useRef(null);

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

  const validateForm = () => {
    const newErrors = {};

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
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

  const handleReset = () => {
    gsap.to(".confirmation", {
      opacity: 0,
      scale: 0.9,
      y: -20,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSubmitted(false);
        setForm({ subject: "", message: "" });
        gsap.fromTo(
          formRef.current,
          { opacity: 0, rotateX: -20, y: 30 },
          { opacity: 1, rotateX: 0, y: 0, duration: 0.7, ease: "power3.out" }
        );
      },
    });
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the Settings page, enter a new password, and confirm it to update your password.",
    },
    {
      question: "How can I upgrade my plan?",
      answer: "Click the 'Upgrade Now' button in the sidebar to explore our enterprise plans and upgrade.",
    },
    {
      question: "Where can I view my transactions?",
      answer: "Navigate to the Transactions page from the main menu to see all your transaction history.",
    },
  ];

  return (
    <div ref={containerRef} className="relative p-6 md:p-12 space-y-6">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-700/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Title */}
      <h1 className="flex flex-row items-center justify-center gap-2  text-xl md:text-2xl font-bold text-center">
        Help Desk <HelpCircle className="w-5 h-5"/>
      </h1>

      {/* FAQ Section */}
      <Card className="w-full lg:w-[40rem] mx-auto shadow-2xl rounded-2xl border border-black backdrop-blur-lg bg-white/70">
        <CardContent className="p-8 md:p-12">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
 
      <div className="w-full lg:w-[40rem] mx-auto mb-6 p-4 rounded-xl bg-indigo-50 border border-indigo-200">
      <h1 className="text-lg font-semibold text-indigo-700">
        Fill the form below!
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        Let us know what you need help with. All fields are required to
        ensure we can reach out if needed.
      </p>
    </div>

      {/* Contact Form */}
      <Card className="form-card">
        <CardContent className="p-8 md:p-12">
          {!submitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject:
              </label>
                <Input
                 id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`peer w-full rounded-xl border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } bg-white/70 px-4 py-5 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                  placeholder="Subject"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="relative">
                <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message:
              </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`peer w-full rounded-xl border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } bg-white/70 px-4 py-5 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                  rows={5}
                  placeholder="Your Message"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white shadow-xl py-4 text-lg font-semibold tracking-wide"
              >
                <SendHorizonal className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          ) : (
            <div className="confirmation flex flex-col items-center justify-center py-12 space-y-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-2xl font-bold text-gray-700 text-center">
                Message Sent!
              </p>
              <p className="text-gray-500 text-center">
                Our support team will get back to you soon
              </p>
              <Button
                onClick={handleReset}
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