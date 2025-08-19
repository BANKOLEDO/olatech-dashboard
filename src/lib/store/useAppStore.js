import { create } from "zustand";
import { persist } from "zustand/middleware";
import { makeSeed } from "../data/seed";

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...makeSeed(),

      addBill: (bill) => set({ bills: [bill, ...get().bills] }),
      addTransaction: (tx) =>
        set({ transactions: [tx, ...get().transactions] }),
    }),
    { name: "olatech-dashboard" }
  )
);
