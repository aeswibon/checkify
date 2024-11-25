"use client";

import {
  AddressInfo,
  EmploymentInfo,
  IdentityVerification,
  PersonalInfo,
  Review,
} from "@/components/steps";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ProgressBar from "@/components/ui/progress";
import { StepContent } from "@/components/ui/step-content";
import { Step } from "@/lib/types";
import { type FormData, formSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const STEPS: Step[] = [
  { id: 1, name: "Personal Info", status: "current" },
  { id: 2, name: "Address", status: "upcoming" },
  { id: 3, name: "Identity", status: "upcoming" },
  { id: 4, name: "Employment", status: "upcoming" },
  { id: 5, name: "Review", status: "upcoming" },
] as const;

export default function KYCForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(STEPS);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = form;

  const saveFormState = () => {
    localStorage.setItem("form-state", JSON.stringify(getValues()));
    localStorage.setItem("current-step", String(currentStep));
  };

  const clearFormState = () => {
    localStorage.removeItem("form-state");
    localStorage.removeItem("current-step");
    reset();
  };

  useEffect(() => {
    (() => {
      const savedState = localStorage.getItem("form-state");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        reset(parsedState);
      }
      const savedStep = localStorage.getItem("current-step");
      if (savedStep) {
        setCurrentStep(Number(savedStep));
        setSteps(updateSteps(Number(savedStep)));
      }
    })();
  }, [reset]);

  const updateSteps = (step: number) => {
    return STEPS.map((s) => ({
      ...s,
      status: s.id < step ? "complete" : s.id === step ? "current" : "upcoming",
    })) as typeof STEPS;
  };

  const getStepFields = (step: number) => {
    return {
      1: ["firstName", "lastName", "email", "phone", "dateOfBirth"],
      2: ["address", "city", "state", "zipCode", "country"],
      3: ["idType", "idNumber", "idDocument", "selfie"],
      4: ["occupation", "employerName", "annualIncome", "sourceOfFunds"],
      5: [],
    }[step] as (keyof FormData)[];
  };

  const isStepValid = (step: number) => {
    const stepFields = getStepFields(step);
    return stepFields.every((field) => !errors[field]);
  };

  const isStepAccessible = (step: number) => {
    return (
      step <= currentStep ||
      (step === currentStep + 1 && isStepValid(currentStep))
    );
  };

  const handleStepClick = (step: number) => {
    if (isStepAccessible(step)) {
      setCurrentStep(step);
      setSteps(updateSteps(step));
    }
  };

  const handleNext = async () => {
    if (isStepValid(currentStep) && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      setSteps(updateSteps(currentStep + 1));
    } else {
      Object.entries(errors).forEach(([field, error]) => {
        toast.error(`${field}: ${error.message}`);
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setSteps(updateSteps(currentStep - 1));
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Submitting KYC form:", data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append("userId", "user123"); // In a real app, this should be a unique user identifier

    try {
      const response = await fetch("/api/submit-kyc", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success("KYC submitted successfully!");
        // clearFormState();
        console.log("KYC submitted successfully");
        // Handle successful submission (e.g., show a success message, redirect)
      } else {
        console.error("KYC submission failed");
        // Handle submission failure
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      // Handle submission error
    }
  };

  console.log("errors", errors);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} onChange={saveFormState}>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Complete Your KYC
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {STEPS.length}
              </p>
            </div>
          </div>

          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            isStepAccessible={isStepAccessible}
          />

          <div className="mt-8">
            <StepContent
              title="Personal Information"
              isActive={currentStep === 1}
            >
              <PersonalInfo />
            </StepContent>

            <StepContent
              title="Address Information"
              isActive={currentStep === 2}
            >
              <AddressInfo />
            </StepContent>

            <StepContent
              title="Identity Verification"
              isActive={currentStep === 3}
            >
              <IdentityVerification />
            </StepContent>

            <StepContent
              title="Employment Information"
              isActive={currentStep === 4}
            >
              <EmploymentInfo />
            </StepContent>

            <StepContent
              title="Review Information"
              isActive={currentStep === 5}
            >
              <Review onEdit={handleStepClick} />
            </StepContent>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            {currentStep === STEPS.length ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
