"use client";

import { Step } from "@/lib/types";
import { ArrowBigRightIcon, CheckCheckIcon } from "lucide-react";

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  isStepAccessible: (step: number) => boolean;
}

const ProgressBar = ({
  steps,
  onStepClick,
  isStepAccessible,
}: ProgressBarProps) => {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-secondary-300 rounded-md md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <button
                onClick={() =>
                  isStepAccessible(step.id) && onStepClick(step.id)
                }
                className={`group flex w-full items-center ${
                  !isStepAccessible(step.id)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 group-hover:bg-green-800">
                    <CheckCheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-secondary-900">
                    {step.name}
                  </span>
                </span>
              </button>
            ) : step.status === "current" ? (
              <button
                onClick={() =>
                  isStepAccessible(step.id) && onStepClick(step.id)
                }
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  !isStepAccessible(step.id)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                aria-current="step"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-green-600">
                  <span className="text-green-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-green-600">
                  {step.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() =>
                  isStepAccessible(step.id) && onStepClick(step.id)
                }
                className={`group flex items-center ${
                  !isStepAccessible(step.id)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-secondary-300 group-hover:border-secondary-400">
                    <span className="text-secondary-500 group-hover:text-secondary-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-secondary-500 group-hover:text-secondary-900">
                    {step.name}
                  </span>
                </span>
              </button>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <ArrowBigRightIcon className="h-full w-full text-secondary-300" />
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressBar;
