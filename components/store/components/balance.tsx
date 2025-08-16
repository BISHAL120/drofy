import React from "react";
import { Wallet } from "lucide-react";
import { auth } from "@/auth";
import { getWaletBalanceById } from "@/lib/data layer/store/store-DL";

const WalletBalance = async () => {
const session =await auth()
const user = session?.user
if(!user) return null
    const getBalance = await getWaletBalanceById(user?.id || "")
    const wallet = getBalance?.wallet

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100">
      <Wallet className="w-4 h-4 text-slate-600" />
      <span className="font-medium text-slate-700">{wallet}</span>
    </div>
  );
};

export default WalletBalance;
