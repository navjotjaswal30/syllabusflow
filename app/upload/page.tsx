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
  const [tasks, setTasks] = useState<
  {
    title: string;
    type: string;
    dueDate: string;
    confidence: string;
    source: string;
    status: string;
  }[]
>([]);

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
      setTasks(data.tasks || []);
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

        {tasks.length > 0 && (
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Extracted Tasks
                </h2>
                
                <p className="mb-6 text-gray-600">
                    SyllabusFlow found these possible coursework items. Later, this will become the review-and-approve screen.
                </p>
                
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">Task</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4">Confidence</th>
                                <th className="p-4">Source</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.title} className="border-t border-gray-200">
                                    <td className="p-4 font-medium">{task.title}</td>
                                    <td className="p-4">{task.type}</td>
                                    <td className="p-4">{task.dueDate}</td>
                                    <td className="p-4">{task.confidence}</td>
                                    <td className="p-4">{task.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        
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