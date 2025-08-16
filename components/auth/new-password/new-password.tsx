"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Loader2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NewPassword = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("userEmail");
  const router = useRouter()

  const handleVerifyClick = () => {
    console.log(verificationCode);

    if (!verificationCode || verificationCode.join("") === "") {
      toast.error("কোডটি সঠিকভাবে বসান!", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }
    if (!password) {
      toast.error("নতুন পাসওয়ার্ড দিন!", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে!", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }

    toast.loading("Verifying...");
    setLoading(true);
    axios
      .post("/api/password/newPassword", {
        userEmail,
        code: verificationCode.join(""),
        password,
      })
      .then((res) => {
        console.log(res.data.data);
        setLoading(false);
        toast.dismiss();
        toast.success(res.data.message);
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.message, {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />,
          style: {
            borderRadius: "6px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
      });
  };

  const handleResendCode = () => {
    setLoading(true);
    toast.loading("Sending OTP...");
    axios
      .post("/api/password/forgetPassword", {
        email: userEmail,
      })
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.dismiss();
        setLoading(false);
        toast.error(error.response.data.message, {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />,
          style: {
            borderRadius: "6px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              <div className="flex justify-center mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Image
                    src="/assets/logo.webp"
                    alt="Logo"
                    width={350}
                    height={150}
                  />
                </div>
              </div>

              <h1 className="text-3xl font-semibold text-center text-orange-600 mb-6">
                Verify Your Password
              </h1>
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code we sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3 justify-center w-full">
              {verificationCode.map((digit, index) => (
                <input
                  disabled={loading}
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  className="w-12 h-12 text-center text-xl font-semibold 
                    border-2 border-gray-200 rounded-xl focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 focus:outline-none 
                    transition-all duration-200 shadow-sm"
                  onKeyUp={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.value && index < 5) {
                      const nextInput =
                        target.nextElementSibling as HTMLInputElement;
                      if (nextInput) nextInput.focus();
                    }
                    if (e.key === "Backspace" && !target.value && index > 0) {
                      setVerificationCode(Array(6).fill(""));
                      const firstInput = document.querySelector(
                        "input"
                      ) as HTMLInputElement;
                      if (firstInput) firstInput.focus();
                    }
                  }}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, "");
                    const newVerificationCode = [...verificationCode];
                    newVerificationCode[index] = newValue;
                    setVerificationCode(newVerificationCode);
                  }}
                />
              ))}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 shadow-sm pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 font-semibold
                shadow-sm hover:shadow-md"
              onClick={handleVerifyClick}
            >
              {loading && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
              Change Password
            </Button>

            <div className="text-center text-sm text-gray-600">
              Didn&lsquo;t receive the code?{" "}
              <button
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 font-medium 
                hover:underline transition-colors"
                onClick={handleResendCode}
              >
                Resend
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewPassword;
