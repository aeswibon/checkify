import type { KYCFormData } from "@/lib/types";
import { z } from "zod";

export interface ValidationError {
  [key: string]: string;
}

export const formSchema = z.object({
  firstName: z.string().min(2, "Min 2 characters required"),
  lastName: z.string().min(2, "Min 2 characters required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string().refine(
    (dob) => {
      const date = new Date(dob);
      const age =
        (new Date().getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      return age >= 18;
    },
    { message: "Must be at least 18 years old" }
  ),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  country: z.string().min(1, "Please select a country"),
  idType: z.string().min(1, "Please select an ID type"),
  idNumber: z.string().min(5, "Please enter a valid ID number"),
  idDocument: z.instanceof(File, { message: "Please upload an ID document" }),
  selfie: z.instanceof(File, { message: "Please upload a selfie" }),
  occupation: z.string().min(2, "Please enter your occupation"),
  employerName: z.string().min(2, "Please enter employer name"),
  annualIncome: z.string().regex(/^\d+$/, "Please enter a valid amount"),
  sourceOfFunds: z.string().min(1, "Please select source of funds"),
});

export type FormData = z.infer<typeof formSchema>;

export const validateField = (
  name: keyof KYCFormData,
  value: string | File
): string => {
  const result = formSchema.shape[name]?.safeParse(value);
  return result?.success ? "" : result.error.errors[0].message;
};

export const validateStep = (
  step: number,
  formData: FormData
): ValidationError => {
  const errors: ValidationError = {};
  const stepFields =
    {
      1: ["firstName", "lastName", "email", "phone", "dateOfBirth"],
      2: ["address", "city", "state", "zipCode", "country"],
      3: ["idType", "idNumber", "idDocument", "selfie"],
      4: ["occupation", "employerName", "annualIncome", "sourceOfFunds"],
    }[step] || [];
  stepFields.forEach((field) => {
    const value = formData[field as keyof FormData];
    const error = validateField(field as keyof KYCFormData, value);
    if (error) {
      errors[field as keyof ValidationError] = error;
    }
  });

  return errors;
};
