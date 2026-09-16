import Link from "next/link";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="mb-6 inline-block text-sm text-gray-500">
          ← Back home
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Upload your syllabus
          </h1>

          <p className="mb-8 text-gray-600">
            Upload a course syllabus PDF. Eventually, this page will extract
            assignments, labs, quizzes, exams, readings, presentations, and
            deadlines.
          </p>

          <div className="rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center">
            <p className="mb-4 text-lg font-medium text-gray-700">
              Drop your syllabus PDF here
            </p>

            <input
              type="file"
              accept="application/pdf"
              className="mx-auto block"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/review"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white"
            >
              Continue to Review Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}