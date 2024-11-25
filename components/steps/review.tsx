import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface ReviewProps {
  onEdit: (step: number) => void;
}

export function Review({ onEdit }: ReviewProps) {
  const { getValues } = useFormContext();
  const formData = getValues();

  const sections = [
    {
      title: "Personal Information",
      step: 1,
      fields: [
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "dateOfBirth", label: "Date of Birth" },
      ],
    },
    {
      title: "Address Information",
      step: 2,
      fields: [
        { key: "address", label: "Address" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
        { key: "zipCode", label: "ZIP Code" },
        { key: "country", label: "Country" },
      ],
    },
    {
      title: "Identity Verification",
      step: 3,
      fields: [
        { key: "idType", label: "ID Type" },
        { key: "idNumber", label: "ID Number" },
        { key: "idDocument", label: "ID Document" },
        { key: "selfie", label: "Selfie" },
      ],
    },
    {
      title: "Employment Information",
      step: 4,
      fields: [
        { key: "occupation", label: "Occupation" },
        { key: "employerName", label: "Employer" },
        { key: "annualIncome", label: "Annual Income" },
        { key: "sourceOfFunds", label: "Source of Funds" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              {section.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(section.step)}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="text-sm font-medium">
                    {formData[field.key] instanceof File
                      ? formData[field.key].name
                      : formData[field.key] || "Not provided"}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Please review all information before submitting. By submitting,
              you confirm that all provided information is accurate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
