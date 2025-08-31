"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RefreshCcw, XCircle, PlusCircle, PauseCircle, PlayCircle } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { SiAdobecreativecloud, SiNetflix } from "react-icons/si";

const initialSubscriptions = [
  {
    id: 1,
    service: "Netflix",
    amount: 15,
    cycle: "Monthly",
    nextBilling: "2025-08-30",
    color: "bg-red-100",
    paused: false,
    icon: <SiNetflix className="text-red-500 text-3xl" />,
  },
  {
    id: 2,
    service: "Spotify",
    amount: 10,
    cycle: "Monthly",
    nextBilling: "2025-08-25",
    color: "bg-green-100",
    paused: false,
    icon: <FaSpotify className="text-green-500 text-3xl" />,
  },
  {
    id: 3,
    service: "Adobe Creative Cloud",
    amount: 50,
    cycle: "Yearly",
    nextBilling: "2026-01-01",
    color: "bg-purple-100",
    paused: false,
    icon: <SiAdobecreativecloud className="text-pink-500 text-3xl" />,
  },
];

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [newService, setNewService] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCycle, setNewCycle] = useState("");

  const togglePause = (id) => {
    setSubscriptions((subs) =>
      subs.map((sub) =>
        sub.id === id ? { ...sub, paused: !sub.paused } : sub
      )
    );
  };

  const cancelSubscription = (id) => {
    setSubscriptions((subs) => subs.filter((sub) => sub.id !== id));
  };

  const addSubscription = () => {
    if (!newService || !newAmount || !newCycle) return;
    const newSub = {
      id: subscriptions.length + 1,
      service: newService,
      amount: Number(newAmount),
      cycle: newCycle,
      nextBilling: "2025-12-01",
      color: "bg-blue-100",
      paused: false,
      icon: <RefreshCcw className="text-blue-500" />, // fallback icon
    };
    setSubscriptions([...subscriptions, newSub]);
    setNewService("");
    setNewAmount("");
    setNewCycle("");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Subscriptions
        </h1>

        {/* Add Subscription Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle /> Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Service Name"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
              <Input
                placeholder="Amount ($)"
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
              <Input
                placeholder="Cycle (e.g., Monthly)"
                value={newCycle}
                onChange={(e) => setNewCycle(e.target.value)}
              />
              <Button className="w-full" onClick={addSubscription}>
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`${sub.color} shadow-lg rounded-2xl`}>
              <CardContent className="p-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    {sub.icon} {sub.service}
                  </h2>
                  <span
                    className={`text-sm font-medium ${
                      sub.paused ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    {sub.paused ? "Paused" : "Active"}
                  </span>
                </div>
                <p className="text-sm">
                  Amount: <span className="font-medium">${sub.amount}</span> / {sub.cycle}
                </p>
                <p className="text-sm">Next Billing: {sub.nextBilling}</p>

                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePause(sub.id)}
                    className="flex items-center gap-1"
                  >
                    {sub.paused ? <PlayCircle /> : <PauseCircle />}
                    {sub.paused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => cancelSubscription(sub.id)}
                    className="flex items-center gap-1"
                  >
                    <XCircle /> Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
