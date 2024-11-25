import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Welcome to KYC Process</CardTitle>
          <CardDescription>
            Complete your verification to get started
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          We need to collect some information to verify your identity. This
          process usually takes about 5-10 minutes.
        </p>
        <Link href="/kyc" passHref>
          <Button className="w-full">Start KYC Process</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
