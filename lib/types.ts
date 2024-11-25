export interface Step {
  id: number;
  name: string;
  status: "complete" | "current" | "upcoming";
}

export interface KYCFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  idType: string;
  idNumber: string;
  idDocument: File;
  selfie: File;
  occupation: string;
  employerName: string;
  annualIncome: string;
  sourceOfFunds: string;
}
