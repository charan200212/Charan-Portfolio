import { NextResponse } from "next/server";

// Required for static export
export const dynamic = "force-static"; // Forces static generation
export const revalidate = false; // Makes it fully static (no revalidation)

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'hle!',
    data: {
      message: 'Message and email sent successfully!',
    }
  }, { status: 200 });
}