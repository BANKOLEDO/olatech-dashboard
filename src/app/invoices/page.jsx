"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";

// Dummy data for invoice-related transactions
const invoiceTransactions = [
  {
    id: 101,
    name: "Software License Renewal",
    date: "Jan 10, 2025",
    amount: 49.99,
    status: "Paid",
    type: "debit",
    requiresInvoice: true,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 102,
    name: "Annual Gym Membership",
    date: "Jan 05, 2025",
    amount: 300,
    status: "Pending",
    type: "debit",
    requiresInvoice: true,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 103,
    name: "App Store Cashback",
    date: "Jan 02, 2025",
    amount: -15.0,
    status: "Refunded",
    type: "credit",
    requiresInvoice: true,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 104,
    name: "Cloud Storage Subscription",
    date: "Dec 28, 2024",
    amount: 99.0,
    status: "Paid",
    type: "debit",
    requiresInvoice: true,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 105,
    name: "Freelance Web Design Invoice",
    date: "Dec 20, 2024",
    amount: 1200,
    status: "Paid",
    type: "credit",
    requiresInvoice: true,
    color: "from-sky-500 to-cyan-500",
  },
  {
    id: 106,
    name: "Conference Ticket Purchase",
    date: "Dec 15, 2024",
    amount: 250,
    status: "Pending",
    type: "debit",
    requiresInvoice: true,
    color: "from-fuchsia-500 to-pink-500",
  },
];

export default function Invoices() {
  const [selectedTx, setSelectedTx] = useState(null);

  const handleDownload = (tx) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${tx.id}`, 20, 40);
    doc.text(`Date: ${tx.date}`, 20, 50);
    doc.text(`Description: ${tx.name}`, 20, 60);
    doc.text(`Amount: $${tx.amount}`, 20, 70);
    doc.text(`Status: ${tx.status}`, 20, 80);

    doc.text("Thank you for your business!", 20, 100);
    doc.save(`invoice-${tx.id}.pdf`);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl md:text-2xl text-center font-bold">Invoices</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {invoiceTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition">
              <div
                className={`h-2 w-full bg-gradient-to-r ${transaction.color}`}
              ></div>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-md md:text-md">{transaction.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {transaction.date}
                </p>

                <p
                  className={`text-xl font-bold ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>

                {transaction.requiresInvoice && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setSelectedTx(transaction)}
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-black text-white"
                      onClick={() => handleDownload(transaction)}
                    >
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal for viewing transaction details */}
      <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedTx && (
            <>
              <DialogHeader>
                <DialogTitle>Invoice Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedTx.id}</p>
                <p><strong>Date:</strong> {selectedTx.date}</p>
                <p><strong>Name:</strong> {selectedTx.name}</p>
                <p><strong>Amount:</strong> ${selectedTx.amount}</p>
                <p><strong>Status:</strong> {selectedTx.status}</p>
                <p><strong>Type:</strong> {selectedTx.type}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
