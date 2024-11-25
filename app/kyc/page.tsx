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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "01/01/2001",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      idType: "",
      idNumber: "",
      idDocument: undefined,
      selfie: undefined,
      occupation: "",
      employerName: "",
      annualIncome: "",
      sourceOfFunds: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = form;

  const saveFormState = () => {
    localStorage.setItem("form-state", JSON.stringify(getValues()));
    if (currentStep < 4) {
      localStorage.setItem("current-step", String(currentStep));
    }
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

  const handleStepClick = async (step: number) => {
    const stepFields = getStepFields(step);
    const isValid = await trigger(stepFields);
    if (isValid && isStepAccessible(step)) {
      setCurrentStep(step);
      setSteps(updateSteps(step));
    }
  };

  const handleNext = async () => {
    const currentStepFields = getStepFields(currentStep);
    const isValid = await trigger(currentStepFields);

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      setSteps(updateSteps(currentStep + 1));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setSteps(updateSteps(currentStep - 1));
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    // generate a unique userId for each submission
    formData.append("userId", Math.random().toString(36).substring(2, 9));

    try {
      const response = await fetch("/api/submit-kyc", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success("KYC submitted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        clearFormState();
        console.log("KYC submitted successfully");
        router.push("/");
      } else {
        console.error("KYC submission failed");
        // Handle submission error
        toast.error("KYC submission failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      // Handle network error
      toast.error("Error submitting KYC", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onChange={saveFormState} onSubmit={(e) => e.preventDefault()}>
        <div className="w-lg md:w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
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

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            {currentStep === STEPS.length ? (
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="w-full sm:w-auto"
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
