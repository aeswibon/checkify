import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StepContentProps {
  title: string;
  children: ReactNode;
  isActive: boolean;
}

export function StepContent({ title, children, isActive }: StepContentProps) {
  if (!isActive) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
