import Link from "next/link";

const tasks = [
  {
    title: "Lab 1 Report",
    course: "CPS 213",
    type: "Lab",
    dueDate: "2026-09-25",
    status: "Not Started",
    confidence: "High",
  },
  {
    title: "Assignment 1",
    course: "CPS 213",
    type: "Assignment",
    dueDate: "2026-10-02",
    status: "Not Started",
    confidence: "High",
  },
  {
    title: "Midterm Exam",
    course: "CPS 213",
    type: "Exam",
    dueDate: "2026-10-18",
    status: "Not Started",
    confidence: "Medium",
  },
  {
    title: "Weekly Reading",
    course: "CPS 213",
    type: "Reading",
    dueDate: "Every Monday",
    status: "Needs Review",
    confidence: "Low",
  },
];

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="mb-6 inline-block text-sm text-gray-500">
          ← Back to dashboard
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Master Task Database
          </h1>

          <p className="mb-8 text-gray-600">
            All extracted coursework tasks from your syllabus appear here.
          </p>

          <div className="mb-6 flex gap-3">
            <button className="rounded-xl bg-black px-4 py-2 text-white">
              All
            </button>
            <button className="rounded-xl border border-gray-300 px-4 py-2">
              Assignments
            </button>
            <button className="rounded-xl border border-gray-300 px-4 py-2">
              Labs
            </button>
            <button className="rounded-xl border border-gray-300 px-4 py-2">
              Exams
            </button>
            <button className="rounded-xl border border-gray-300 px-4 py-2">
              Needs Review
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Task</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Confidence</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.title} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{task.title}</td>
                    <td className="p-4">{task.course}</td>
                    <td className="p-4">{task.type}</td>
                    <td className="p-4">{task.dueDate}</td>
                    <td className="p-4">{task.status}</td>
                    <td className="p-4">{task.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}