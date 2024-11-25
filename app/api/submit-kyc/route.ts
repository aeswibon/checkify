import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;

    // Handle file uploads
    const idDocument = formData.get("idDocument") as File;
    const selfie = formData.get("selfie") as File;

    let idDocumentUrl = "";
    let selfieUrl = "";

    if (idDocument) {
      const { url } = await put(`kyc/${userId}/id-document`, idDocument, {
        access: "public",
      });
      idDocumentUrl = url;
    }

    if (selfie) {
      const { url } = await put(`kyc/${userId}/selfie`, selfie, {
        access: "public",
      });
      selfieUrl = url;
    }

    // Prepare data for storage
    const kycData = {
      personalInfo: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        dateOfBirth: formData.get("dateOfBirth"),
      },
      addressInfo: {
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        zipCode: formData.get("zipCode"),
        country: formData.get("country"),
      },
      identityInfo: {
        idType: formData.get("idType"),
        idNumber: formData.get("idNumber"),
        idDocumentUrl,
        selfieUrl,
      },
      employmentInfo: {
        occupation: formData.get("occupation"),
        employerName: formData.get("employerName"),
        annualIncome: formData.get("annualIncome"),
        sourceOfFunds: formData.get("sourceOfFunds"),
      },
    };

    // Store data in Vercel KV
    await kv.set(`kyc:${userId}`, JSON.stringify(kycData));

    return NextResponse.json({
      success: true,
      message: "KYC data submitted successfully",
    });
  } catch (error) {
    console.error("Error processing KYC submission:", error);
    return NextResponse.json(
      { success: false, message: "Error processing KYC submission" },
      { status: 500 }
    );
  }
}
