"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

// Color palette for card headers
const gradients = [
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-cyan-500",
  "from-fuchsia-500 to-pink-500",
];

// Seed data
const initialBills = [
  { id: 1, name: "Rent", amount: 500, frequency: "Monthly", nextDue: "2025-09-01", status: "Active", color: gradients[0] },
  { id: 2, name: "Gym", amount: 40, frequency: "Monthly", nextDue: "2025-08-25", status: "Active", color: gradients[1] },
  { id: 3, name: "Insurance", amount: 120, frequency: "Quarterly", nextDue: "2025-10-01", status: "Active", color: gradients[2] },
  { id: 4, name: "Netflix", amount: 15, frequency: "Monthly", nextDue: "2025-08-22", status: "Active", color: gradients[3] },
  { id: 5, name: "Spotify", amount: 10, frequency: "Monthly", nextDue: "2025-08-23", status: "Active", color: gradients[4] },
  { id: 6, name: "Internet", amount: 60, frequency: "Monthly", nextDue: "2025-08-30", status: "Active", color: gradients[5] },
];

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return d;
  }
}

export default function Recurring() {
  const [bills, setBills] = useState(initialBills);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [toCancelId, setToCancelId] = useState(null);

  // Add form state
  const [addForm, setAddForm] = useState({
    name: "",
    amount: "",
    frequency: "Monthly",
    nextDue: "",
    status: "Active",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    amount: "",
    frequency: "Monthly",
    nextDue: "",
    status: "Active",
    color: gradients[0],
  });

  const totalMonthly = useMemo(
    () =>
      bills
        .filter((b) => b.status === "Active" && b.frequency === "Monthly")
        .reduce((sum, b) => sum + Number(b.amount || 0), 0),
    [bills]
  );

  // Handlers
  const openEdit = (bill) => {
    setEditingBill(bill);
    setEditForm({ ...bill });
    setIsEditOpen(true);
  };

  const saveEdit = () => {
    setBills((prev) => prev.map((b) => (b.id === editForm.id ? { ...editForm, amount: Number(editForm.amount) } : b)));
    setIsEditOpen(false);
  };

  const openCancel = (id) => {
    setToCancelId(id);
    setIsCancelOpen(true);
  };

  const confirmCancel = () => {
    setBills((prev) =>
      prev.map((b) => (b.id === toCancelId ? { ...b, status: "Canceled" } : b))
    );
    setIsCancelOpen(false);
    setToCancelId(null);
  };

  const addPayment = () => {
    if (!addForm.name || !addForm.amount || !addForm.nextDue) return;
    const color = gradients[Math.floor(Math.random() * gradients.length)];
    const newBill = {
      id: Date.now(),
      name: addForm.name,
      amount: Number(addForm.amount),
      frequency: addForm.frequency,
      nextDue: addForm.nextDue,
      status: addForm.status,
      color,
    };
    setBills((prev) => [newBill, ...prev]);
    setIsAddOpen(false);
    setAddForm({ name: "", amount: "", frequency: "Monthly", nextDue: "", status: "Active" });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl text-center mb-2 font-bold">Recurring Payments</h1>
          <p className="text-sm text-muted-foreground">
            Active monthly total: <span className="font-semibold">${totalMonthly.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" /> Add Payment
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {bills.map((bill) => (
            <motion.div
              key={bill.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="shadow-md hover:shadow-lg transition overflow-hidden rounded-2xl">
                <div className={`h-2 w-full bg-gradient-to-r ${bill.color}`} />
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-semibold">{bill.name}</h2>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          bill.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : bill.status === "Canceled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      Amount: <span className="font-medium">${Number(bill.amount).toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">Frequency: {bill.frequency}</p>
                    <p className="text-sm text-gray-600">Next Due: {formatDate(bill.nextDue)}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-2" onClick={() => openEdit(bill)}>
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 gap-2"
                      onClick={() => openCancel(bill.id)}
                      disabled={bill.status === "Canceled"}
                    >
                      <Trash2 className="h-4 w-4" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recurring Payment</DialogTitle>
            <DialogDescription>Set up a new recurring payment.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="add-name">Name</Label>
              <Input id="add-name" value={addForm.name} onChange={(e) => setAddForm((s) => ({ ...s, name: e.target.value }))} />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="add-amount">Amount (USD)</Label>
              <Input
                id="add-amount"
                type="number"
                min="0"
                step="0.01"
                value={addForm.amount}
                onChange={(e) => setAddForm((s) => ({ ...s, amount: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Frequency</Label>
              <Select value={addForm.frequency} onValueChange={(v) => setAddForm((s) => ({ ...s, frequency: v }))}>
                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="add-nextdue">Next Due</Label>
              <Input
                id="add-nextdue"
                type="date"
                value={addForm.nextDue}
                onChange={(e) => setAddForm((s) => ({ ...s, nextDue: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Status</Label>
              <Select value={addForm.status} onValueChange={(v) => setAddForm((s) => ({ ...s, status: v }))}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={addPayment}>Add Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogDescription>Update details for this recurring payment.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-amount">Amount (USD)</Label>
              <Input
                id="edit-amount"
                type="number"
                min="0"
                step="0.01"
                value={editForm.amount}
                onChange={(e) => setEditForm((s) => ({ ...s, amount: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Frequency</Label>
              <Select value={editForm.frequency} onValueChange={(v) => setEditForm((s) => ({ ...s, frequency: v }))}>
                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-nextdue">Next Due</Label>
              <Input
                id="edit-nextdue"
                type="date"
                value={editForm.nextDue?.slice(0, 10) || ""}
                onChange={(e) => setEditForm((s) => ({ ...s, nextDue: e.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Status</Label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm((s) => ({ ...s, status: v }))}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Close</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirm */}
      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this recurring payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the payment as <strong>Canceled</strong>. You can edit it later to re-activate if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep it</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmCancel}>
              Yes, cancel it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
