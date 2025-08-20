"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { Icon } from "@iconify/react";

// shadcn/ui bits for the modal + inputs
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// category → icon mapping (extend as you like)
const iconMap = {
  netflix: "logos:netflix-icon",
  spotify: "logos:spotify-icon",
  adobe: "logos:adobe",
  youtube: "logos:youtube-icon",
  icloud: "logos:apple",
  steam: "flat-color-icons:steam",
  custom: "mdi:credit-card-outline",
};

const initialBills = [
  {
    id: 1,
    name: "Netflix Subscription",
    date: "June 28, 2025",
    amount: 15.99,
    icon: iconMap.netflix,
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Spotify Premium",
    date: "June 30, 2025",
    amount: 9.99,
    icon: iconMap.spotify,
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    date: "July 4, 2025",
    amount: 52.99,
    icon: iconMap.adobe,
    status: "Scheduled",
  },
  {
    id: 4,
    name: "YouTube Premium",
    date: "July 10, 2025",
    amount: 12.99,
    icon: iconMap.youtube,
    status: "Scheduled",
  },
  {
    id: 5,
    name: "iCloud Storage",
    date: "July 12, 2025",
    amount: 2.99,
    icon: iconMap.icloud,
    status: "Scheduled",
  },
  {
    id: 6,
    name: "Steam Game Pass",
    date: "July 15, 2025",
    amount: 14.99,
    icon: iconMap.steam,
    status: "Scheduled",
  },
];

export default function UpcomingBills() {
  const [showAll, setShowAll] = useState(false);
  const [bills, setBills] = useState(initialBills);

  // modal state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    amount: "",
    category: "custom",
    status: "Scheduled",
  });

  const visibleBills = showAll ? bills : bills.slice(0, 3);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setForm({ name: "", date: "", amount: "", category: "custom", status: "Scheduled" });
  };

  const addBill = () => {
    const amountNum = parseFloat(form.amount);
    if (!form.name || !form.date || isNaN(amountNum)) return;

    const newBill = {
      id: bills.length + 1,
      name: form.name,
      date: form.date,
      amount: amountNum,
      icon: iconMap[form.category] || iconMap.custom,
      status: form.status || "Scheduled",
    };

    setBills([newBill, ...bills]);
    closeModal();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[1.3rem] font-bold mt-1">
          Upcoming Bill & Payment
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openModal}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {visibleBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon icon={bill.icon} width="28" height="28" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">${bill.amount}</p>
                  <p className="text-xs text-muted-foreground">{bill.status}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>
      </CardContent>

      {/* Add Bill Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Bill</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                placeholder="e.g. Netflix Subscription"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Date</Label>
              <Input
                type="text"
                placeholder="e.g. July 20, 2025"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g. 14.99"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose app/service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="netflix">Netflix</SelectItem>
                  <SelectItem value="spotify">Spotify</SelectItem>
                  <SelectItem value="adobe">Adobe</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="icloud">iCloud</SelectItem>
                  <SelectItem value="steam">Steam</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={addBill}>Add Bill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
