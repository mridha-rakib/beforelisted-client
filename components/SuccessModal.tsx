"use client";

import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
  buttonLabel?: string;
  showMovingDiscountsMessage?: boolean;
}

export default function SuccessModal({
  isOpen,
  onClose,
  redirectPath = "/renter/saved-requests",
  buttonLabel = "Go to Requests",
  showMovingDiscountsMessage = false,
}: SuccessModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div
        className={`bg-white rounded-2xl shadow-xl w-[90%] sm:w-[420px] max-w-md p-8 text-center animate-fadeIn ${showMovingDiscountsMessage ? "max-h-[90dvh] overflow-y-auto" : ""}`}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {showMovingDiscountsMessage ? "We're on it" : "We’re on it"}
        </h2>
        {showMovingDiscountsMessage ? (
          <div className="text-gray-700 text-sm text-left sm:text-base leading-relaxed mb-6 space-y-4">
            <p>Thank you for submitting your preferences.</p>
            <p>{"Your request has been saved and shared with your registered agent. It will appear in your Requests section. If an opportunity aligns with one of your requests, it will appear in the Matches section of your dashboard and you'll be notified by email."}</p>
            <p>{"Now that you're registered with BeforeListed, feel free to use your exclusive discounts on moving companies, internet and TV, and more to help make your move more affordable."}</p>
          </div>
        ) : (
          <p className="text-gray-700 text-sm text-left sm:text-base leading-relaxed mb-6">
            Thank you for submitting your preferences. <br />
            Your request has been saved and shared with your registered agent. It
            will appear in your Requests section. If an opportunity aligns with
            one of your requests, it will appear in the Matches section of your
            dashboard and you’ll be notified by email.
          </p>
        )}

        <button
          onClick={() => {
            onClose();
            router.push(redirectPath);
          }}
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 hover:bg-blue-700 transition"
        >
          {buttonLabel}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
