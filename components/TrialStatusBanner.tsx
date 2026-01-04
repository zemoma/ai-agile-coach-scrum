import type { TrialStatus } from "@/types";

interface TrialStatusBannerProps {
  trialStatus: TrialStatus;
}

export function TrialStatusBanner({ trialStatus }: TrialStatusBannerProps) {
  // Don't show banner for unlimited users
  if (trialStatus.isUnlimited) {
    return null;
  }

  // Show full warning only when limit is reached
  if (trialStatus.hasReachedLimit) {
    return (
      <div className="px-4 sm:px-6 pb-2">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
                  <span className="font-semibold">Trial ended.</span> Email{" "}
                  <a
                    href="mailto:fanyicharllson@gmail.com"
                    className="font-medium underline hover:text-red-900 dark:hover:text-red-100"
                  >
                    fanyicharllson@gmail.com
                  </a>{" "}
                  to continue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact inline indicator for remaining messages
  return (
    <div className="px-4 sm:px-6 pb-2">
      <div className="max-w-4xl mx-auto">
        <div
          className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs ${
            trialStatus.remainingMessages === 1
              ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
              : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <svg
              className={`w-3.5 h-3.5 ${
                trialStatus.remainingMessages === 1
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              className={`font-medium ${
                trialStatus.remainingMessages === 1
                  ? "text-orange-800 dark:text-orange-200"
                  : "text-blue-800 dark:text-blue-200"
              }`}
            >
              {trialStatus.remainingMessages} {trialStatus.remainingMessages === 1 ? "message" : "messages"} left
            </span>
          </div>
          <a
            href="mailto:fanyicharllson@gmail.com"
            className={`font-medium underline whitespace-nowrap ${
              trialStatus.remainingMessages === 1
                ? "text-orange-700 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-100"
                : "text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
            }`}
          >
            Get more
          </a>
        </div>
      </div>
    </div>
  );
}
