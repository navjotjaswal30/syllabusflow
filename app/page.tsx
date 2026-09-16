import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-gray-500">
            AI-Powered Academic Planner
          </p>

          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Turn your syllabus into a semester task dashboard.
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            SyllabusFlow helps students upload a course syllabus, extract labs,
            assignments, quizzes, exams, presentations, readings, and deadlines,
            then organize everything into one master task database.
          </p>

          <div className="flex gap-4">
            <Link
              href="/upload"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white"
            >
              Upload Syllabus
            </Link>

            <Link
              href="/tasks"
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-900"
            >
              View Demo Tasks
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">1. Upload</h2>
            <p className="text-gray-600">
              Add a syllabus PDF from any university course.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">2. Review</h2>
            <p className="text-gray-600">
              Check AI-extracted tasks before they are saved.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">3. Organize</h2>
            <p className="text-gray-600">
              Generate a task database with deadlines, types, and status.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}