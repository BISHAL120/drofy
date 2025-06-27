import Link from "next/link";
import React from "react";
import AnimatedGhost from "./accessDeniedEmoje";

const IdActiveAlert = () => {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center p-5 overflow-hidden">
      <div
        className="w-fit flex flex-col justify-center items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <p className="font-bold">Account Not Active</p>
          </div>
          <div>
            <p className="text-sm">
              Your account is currently inactive. Please contact support to
              activate your account and continue using our services.
            </p>
          </div>
        </div>
        <Link
          href="https://wa.me/+8801704667915"
          target="_blank"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-3 cursor-pointer"
        >
          Contact Support via WhatsApp
        </Link>
      </div>
      <div className="animate-[slideLeftRight_8s_linear_infinite] flex ">
        <AnimatedGhost />
        <AnimatedGhost />
        <AnimatedGhost />
        <AnimatedGhost />
      </div>
    </div>
  );
};

export default IdActiveAlert;
