"use client";

import { Button } from "@/components/ui/button";
import { ResellerLevel, UserStatus } from "@prisma/client";
import axios from "axios";
import {
  Calendar,
  Check,
  DollarSign,
  Eye,
  Mail,
  MapPin,
  Package,
  Phone,
  PhoneForwarded,
  TrendingUp,
  Users2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmationDialog from "../../components/confirmationDialog";

const UserDetailsPage = ({
  user,
  referralCount,
}: {
  user: {
    name: string;
    id: string;
    phone: string;
    email: string | null;
    address: string | null;
    profileImage: string | null;
    referralCode: number;
    status: UserStatus;
    isActive: boolean;
    wallet: number;
    saleCount: number | null;
    totalSales: number | null;
    companyName: string | null;
    resellerLevel: ResellerLevel;
    createdAt: Date;
  } | null;
  referralCount: number;
}) => {
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Users2 className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Reseller Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The reseller you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/resellers")}
            className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors duration-300"
          >
            Back to Resellers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-2xl font-bold">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {user.name}
                  </h2>
                  <p className="text-slate-600">
                    {user.companyName
                      ? user.companyName
                      : "Company Name Not Found"}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border bg-sky-50 text-sky-700 border-sky-200`}
                    >
                      {user.resellerLevel.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border bg-amber-50 text-amber-700 border-amber-200`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Member since</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ConfirmationDialog
                      trigger={
                        <Button
                          className={`${
                            user.isActive
                              ? "bg-rose-500 text-white"
                              : "bg-slate-100 text-slate-700"
                          } px-3 py-1.5 font-semibold rounded-lg hover:bg-slate-300 transition-colors duration-300 flex items-center gap-1.5 text-sm`}
                        >
                          {user.isActive ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          <span>{user.status}</span>
                        </Button>
                      }
                      currentState={!user.isActive}
                      title="Active Account"
                      description={`Are you sure you want to ${
                        user.isActive ? "deactivate" : "activate"
                      } this account?`}
                      onConfirm={() => {
                        toast.loading("Updating account status...");
                        axios
                          .patch("/api/admin/reseller", {
                            id: user.id,
                            isActive: user.isActive,
                          })
                          .then((res) => {
                            console.log(res.data);
                            toast.dismiss();
                            toast.success(
                              "Account status updated successfully"
                            );
                          });
                      }}
                    />

                    <Link
                      href={`https://wa.me/+880${user.phone}`}
                      target="_blank"
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 font-medium rounded-lg hover:bg-rose-300 transition-colors duration-300 flex items-center gap-1.5 text-sm"
                    >
                      <PhoneForwarded className="w-4 h-4" />
                      <span>Call</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Package className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="text-2xl font-bold text-slate-800">
                  {user.saleCount ? user.saleCount : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Sales</p>
                <p className="text-2xl font-bold text-slate-800">
                  ${user.totalSales ? user.totalSales.toLocaleString() : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Wallet Balance</p>
                <p className="text-2xl font-bold text-slate-800">
                  ${user.wallet.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Referral Users</p>
                <p className="text-2xl font-bold text-slate-800">
                  {referralCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                Contact Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <div className="w-1/2 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="text-slate-800">{user.phone}</p>
                  </div>
                </div>
                <div className="w-1/2 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Account ID</p>
                    <div className="text-sm text-slate-800">
                      RES-{user.referralCode.toString().padStart(3, "0")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/2 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-slate-800">
                      {user.email ? user.email : "example@gmail.com"}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="text-slate-800">
                      {user.address ? user.address : "Address not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Notes & Observations
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Last updated: 2 days ago
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="text-slate-600 leading-relaxed">
                  High-performing reseller with exceptional track record.
                  Consistently maintains premium product quality standards and
                  provides excellent customer service. Notable achievements
                  include:
                </p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
                  <li>Achieved 98% positive customer feedback rating</li>
                  <li>Maintains average response time under 2 hours</li>
                  <li>Successfully handled over 500 premium transactions</li>
                </ul>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>Added by Admin</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Confidential</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          {/*  <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                Account Activity
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Last Login</p>
                  <p className="text-slate-800">
                    {"January 15, 2024, 10:30 AM"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Account ID</p>
                  <div className="text-sm text-slate-800">
                    RES-{user.referralCode.toString().padStart(3, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
