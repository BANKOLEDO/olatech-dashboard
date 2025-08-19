"use client";
import EarningsChart from "@/components/charts/EarningsChart";
import SpendingChart from "@/components/charts/SpendingChart";
import CashflowChart from "@/components/charts/CashflowChart";
import UpcomingBills from "@/components/dashboard/UpcomingBills";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
export default function DashboardCharts() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      {/* Desktop grid for Earnings + Spending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EarningsChart />
          <SpendingChart />
      {/* Cash Flow section */}
        {/* <CashflowChart /> */}
      </div>
       <CashflowChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <UpcomingBills />
  <RecentTransactions />
</div>
    </div> 
  );
}
