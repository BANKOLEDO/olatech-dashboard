"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Login() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

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

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
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

    // Simulate setting dummy authentication data
    localStorage.setItem("dummyToken", JSON.stringify({
      name: form.name,
      email: form.email
    }));

    // Redirect to home page
    gsap.to(formRef.current, {
      opacity: 0,
      rotateX: 20,
      y: -20,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/");
      },
    });
  };

  return (
    <div ref={containerRef} className="relative p-6 md:p-12 space-y-6 min-h-[70vh] flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-700/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Card */}
      <Card className="shadow-2xl rounded-2xl border border-gray-100 backdrop-blur-lg bg-white/70 w-full max-w-md">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-xl md:text-2xl font-bold text-center  mb-6">
            Login to OLATECH Dashboard
          </h1>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <Input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`peer w-full rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } bg-white/70 px-4 py-5 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`peer w-full rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-white/70 px-4 py-5 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`peer w-full rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-white/70 px-4 py-5 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm`}
                placeholder="Your Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-800 text-white shadow-xl py-4 text-lg font-semibold tracking-wide"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}