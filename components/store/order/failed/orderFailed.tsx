"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function OrderFailedPage() {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="order-failed-container">
      <div className={`order-failed-content ${isVisible ? "fade-in" : ""}`}>
        {/* Animated Error Icon */}
        <div className="icon-container">
          <svg
            className="error-icon"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Order failed icon"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ef4444"
              strokeWidth="4"
              fill="none"
              className="error-circle"
            />
            <path
              d="M35 35L65 65M65 35L35 65"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              className="error-cross"
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="error-title">
          {message
            ? message.split("-").join(" ")
            : "টেকনিক্যাল সমস্যার কারণে আপনার অর্ডারটি সম্পন্ন হয়নি"}
        </h1>

        {/* Explanation */}
        <div className="error-explanation">
          <p>
            আপনার অর্ডার #ID -{orderId ? orderId : " "}{" "}
            <span className="line-through pr-1">
              {!orderId ? "পাওয়া যায়নি " : orderId}{" "}
            </span>{" "}
            এর পেমেন্ট প্রক্রিয়াকরণে একটি সমস্যা হয়েছে। এটি অপর্যাপ্ত তহবিল,
            মেয়াদ উত্তীর্ণ কার্ড, অথবা অস্থায়ী নেটওয়ার্ক সমস্যার কারণে হতে
            পারে।
          </p>
          <p>
            চিন্তা করবেন না - আপনার পণ্যগুলি এখনও কার্টে রয়েছে এবং কোনো চার্জ
            করা হয়নি।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <Link href="/store/cart/checkOut">
            <button
              className="btn btn-secondary"
              aria-label="Return to shopping cart"
            >
              <span>Go Back to Cart</span>
            </button>
          </Link>

          <Link
            href="https://m.me/restockbd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn btn-outline"
              aria-label="Contact customer support via Messenger"
            >
              <span>Contact Support</span>
            </button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="help-text">
          <p>
            Need immediate assistance? Call us at{" "}
            <a href="tel:+1-800-123-4567" className="support-link">
              1-800-123-4567
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        .order-failed-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .order-failed-content {
          max-width: 500px;
          width: 100%;
          text-align: center;
          background: white;
          border-radius: 16px;
          padding: 3rem 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .order-failed-content.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .icon-container {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .error-icon {
          width: 80px;
          height: 80px;
          animation: iconAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }

        .error-circle {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          animation: drawCircle 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }

        .error-cross {
          stroke-dasharray: 42;
          stroke-dashoffset: 42;
          animation: drawCross 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
        }

        @keyframes iconAppear {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCross {
          to {
            stroke-dashoffset: 0;
          }
        }

        .error-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }

        .error-explanation {
          margin-bottom: 2.5rem;
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
        }

        .error-explanation p {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .error-explanation p:last-child {
          margin-bottom: 0;
          font-weight: 500;
          color: #374151;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
        }

        .btn:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        .btn:active {
          transform: translateY(1px);
        }

        .btn-primary {
          background: #ef4444;
          color: white;
        }

        .btn-primary:hover {
          background: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);
        }

        .btn-secondary {
          background: #3b82f6;
          color: white;
        }

        .btn-secondary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }

        .btn-outline {
          background: transparent;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .btn-outline:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          color: #374151;
          transform: translateY(-1px);
        }

        .help-text {
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1s both;
        }

        .help-text p {
          color: #9ca3af;
          font-size: 0.875rem;
          margin: 0;
        }

        .support-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .support-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        .support-link:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 2px;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (min-width: 640px) {
          .order-failed-content {
            padding: 4rem 3rem;
          }

          .error-title {
            font-size: 2rem;
          }

          .error-icon {
            width: 100px;
            height: 100px;
          }

          .button-group {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn {
            min-width: 140px;
          }
        }

        @media (min-width: 768px) {
          .button-group {
            gap: 1rem;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .order-failed-content {
            border: 2px solid #000;
          }

          .btn-outline {
            border-color: #000;
            color: #000;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .order-failed-content,
          .error-icon,
          .error-circle,
          .error-cross,
          .error-title,
          .error-explanation,
          .button-group,
          .help-text {
            animation: none;
          }

          .order-failed-content {
            opacity: 1;
            transform: none;
          }

          .btn {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
