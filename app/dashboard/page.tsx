import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-6xl">
        <Link href="/review" className="mb-6 inline-block text-sm text-gray-500">
          ← Back to review
        </Link>

        <div className="mb-8 rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            CPS 213 Course Dashboard
          </h1>

          <p className="text-gray-600">
            Your syllabus has been converted into an organized course workspace.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold">24</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Due This Week</p>
            <p className="text-3xl font-bold">3</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Needs Review</p>
            <p className="text-3xl font-bold">2</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold">0%</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">Upcoming Deadlines</h2>

          <ul className="space-y-3">
            <li className="rounded-xl bg-gray-50 p-4">
              Lab 1 Report — due September 25
            </li>
            <li className="rounded-xl bg-gray-50 p-4">
              Assignment 1 — due October 2
            </li>
            <li className="rounded-xl bg-gray-50 p-4">
              Midterm Exam — October 18
            </li>
          </ul>

          <div className="mt-8">
            <Link
              href="/tasks"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white"
            >
              View Master Task Database
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}