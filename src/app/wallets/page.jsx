"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Wallet,
  Bitcoin,
  DollarSign,
  Shield,
  LineChart,
} from "lucide-react";
import { useState } from "react";

export default function WalletsPage() {
  const [showCrypto, setShowCrypto] = useState(false);
  const [showBanks, setShowBanks] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showInvestments, setShowInvestments] = useState(false);

  // American Commercial Banks
  const commercialBanks = [
    { id: 1, name: "Bank of America", balance: 85000 },
    { id: 2, name: "JPMorgan Chase", balance: 72000 },
    { id: 3, name: "Wells Fargo", balance: 64000 },
    { id: 4, name: "Citibank", balance: 53000 },
    { id: 5, name: "Goldman Sachs", balance: 91000 },
  ];

  const totalBankBalance = commercialBanks
    .reduce((acc, bank) => acc + bank.balance, 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });

  const cryptoCoins = [
    { name: "Bitcoin", symbol: "BTC", balance: "0.35", usd: 39844.35, icon: <Bitcoin className="w-5 h-5 text-yellow-500" /> },
    { name: "Ethereum", symbol: "ETH", balance: "1.8", usd: 7603.83, icon: <DollarSign className="w-5 h-5 text-indigo-500" /> },
    { name: "USDT", symbol: "USDT", balance: "1200", usd: 1200, icon: <Shield className="w-5 h-5 text-green-500" /> },
  ];

  const hardwareWallet = {
    balance: 9750,
    device: "Ledger Nano X",
  };

  const investments = [
    { id: 1, name: "Tesla Stocks", amount: "$4,500.00", change: "+2.1%" },
    { id: 2, name: "S&P 500 ETF", amount: "$8,200.00", change: "-0.5%" },
    { id: 3, name: "Polygon Staking", amount: "$2,900.00", change: "+3.8%" },
  ];

  const totalCryptoBalance = cryptoCoins
    .reduce((acc, coin) => acc + coin.usd, 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });

  const totalHardwareBalance = hardwareWallet.balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalInvestmentBalance = investments
    .reduce((acc, inv) => parseFloat(inv.amount.replace(/[$,]/g, "")) + acc, 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Wallets</h1>

      {/* Commercial Bank Wallet */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="text-blue-600" /> Commercial Banks
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowBanks(!showBanks)}>
              {showBanks ? "Hide Banks" : "View Banks"}
              {showBanks ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Balance: {totalBankBalance}</p>

            {showBanks && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                {commercialBanks.map((bank) => (
                  <motion.div key={bank.id} whileHover={{ scale: 1.03 }} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="font-medium">{bank.name}</p>
                    <p className="font-semibold">{bank.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Crypto Wallet */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bitcoin className="text-yellow-500" /> Crypto Wallet
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowCrypto(!showCrypto)}>
              {showCrypto ? "Hide Coins" : "View Coins"}
              {showCrypto ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-3">Balance: {totalCryptoBalance}</p>

            {showCrypto && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {cryptoCoins.map((coin, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.03 }} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      {coin.icon}
                      <span className="font-medium">{coin.name} ({coin.symbol})</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{coin.balance}</p>
                      <p className="text-sm text-muted-foreground">${coin.usd.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Hardware Wallet */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-green-600" /> Hardware Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Balance: {totalHardwareBalance}</p>
            <p className="text-sm text-muted-foreground">{hardwareWallet.device} connected</p>
            <Button className="mt-3" onClick={() => setShowManage(!showManage)}>
              {showManage ? "Close Manager" : "Manage"}
            </Button>

            {showManage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-2">
                <p className="text-sm">🔐 Backup seed phrase</p>
                <p className="text-sm">⬆️ Update firmware</p>
                <p className="text-sm">💱 Transfer assets</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Investment Wallet */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="text-purple-600" /> Investment Wallet
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowInvestments(!showInvestments)}>
              {showInvestments ? "Hide Portfolio" : "View Portfolio"}
              {showInvestments ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Balance: {totalInvestmentBalance}</p>

            {showInvestments && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                {investments.map((inv) => (
                  <motion.div key={inv.id} whileHover={{ scale: 1.03 }} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="font-medium">{inv.name}</p>
                      <p className={`text-xs ${inv.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                        {inv.change}
                      </p>
                    </div>
                    <p className="font-semibold">{inv.amount}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
