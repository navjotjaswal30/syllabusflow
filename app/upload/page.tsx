"use client";

import { useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please choose a PDF first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setExtractedText("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setFileName(data.fileName);
      setPages(data.pages);
      setExtractedText(data.text);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-block text-sm text-gray-500">
          ← Back home
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Upload your syllabus
          </h1>

          <p className="mb-8 text-gray-600">
            Upload a course syllabus PDF. SyllabusFlow will read the PDF text and
            show the extracted content below.
          </p>

          <div className="rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center">
            <p className="mb-4 text-lg font-medium text-gray-700">
              Choose a syllabus PDF
            </p>

            <input
              type="file"
              accept="application/pdf"
              className="mx-auto block"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] || null;
                setFile(selectedFile);
                setError("");
              }}
            />

            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="mt-6 rounded-xl bg-black px-6 py-3 font-medium text-white disabled:bg-gray-400"
            >
              {isLoading ? "Reading PDF..." : "Extract PDF Text"}
            </button>

            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        </div>

        {extractedText && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Extracted Text
            </h2>

            <p className="mb-4 text-gray-600">
              File: {fileName} {pages && `• ${pages} pages`}
            </p>

            <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded-2xl bg-gray-100 p-6 text-sm text-gray-800">
              {extractedText}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}