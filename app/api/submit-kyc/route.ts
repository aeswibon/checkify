import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.formData();
    const formData = Object.fromEntries(res.entries());
    console.log("Received form data:", formData);

    // Here you would typically process the form data, save it to a database, etc.
    // For now, we'll just simulate a successful submission

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
