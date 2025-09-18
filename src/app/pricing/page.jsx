"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-10 items-center p-4">
      {/* Title */}
            <h1 className=" flex flex-row gap-2 items-center justify-center text-xl md:text-2xl font-bold text-center">
              Pricing
            </h1>
      <div className="grid grid-cols-1 max-w-md lg:grid-cols-2 gap-6 md:max-w-4xl w-full">
        {/* Free Plan Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Starter Plan</h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">$0<span className="text-lg font-normal text-gray-600">/month</span></p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              Basic financial tracking
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              Monthly reports
            </li>
            <li className="flex items-center gap-2 line-through text-gray-400">
              <Check className="h-5 w-5 text-gray-400" />
              Advanced analytics (Upgrade for this)
            </li>
            <li className="flex items-center gap-2  line-through text-gray-400">
              <Check className="h-5 w-5 text-gray-400" />
              Priority support (Upgrade for this)
            </li>
          </ul>
          <Button
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
            disabled
          >
            Current Plan
          </Button>
        </div>

        {/* Pro Plan Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Enterprise Plan</h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">$10<span className="text-lg font-normal text-gray-600">/month</span></p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              All Free Plan features
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              Advanced analytics
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              Priority support
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="h-5 w-5 text-green-500" />
              Custom reports
            </li>
          </ul>
          <Button
            onClick={() => alert("Redirect to payment gateway or subscription flow")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Upgrade to Enterprise
          </Button>
        </div>
      </div>
    </div>
  );
}