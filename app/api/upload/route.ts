import { NextResponse } from "next/server";
import { mockExtractTasks } from "@/lib/mockExtractTasks";
const pdf = require("pdf-parse/lib/pdf-parse.js");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a PDF file." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await pdf(buffer);

    const tasks = mockExtractTasks(data.text);

    return NextResponse.json({
        fileName: file.name,
        text: data.text,
        pages: data.numpages,
        tasks,
    });
  } catch (error) {
    console.error("PDF upload error:", error);

    return NextResponse.json(
      { error: "Something went wrong while reading the PDF." },
      { status: 500 }
    );
  }
}