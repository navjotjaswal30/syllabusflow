import Link from "next/link";

const extractedTasks = [
  {
    title: "Lab 1 Report",
    type: "Lab",
    dueDate: "2026-09-25",
    confidence: "High",
    source: "Page 3",
  },
  {
    title: "Assignment 1",
    type: "Assignment",
    dueDate: "2026-10-02",
    confidence: "High",
    source: "Page 4",
  },
  {
    title: "Midterm Exam",
    type: "Exam",
    dueDate: "2026-10-18",
    confidence: "Medium",
    source: "Page 5",
  },
  {
    title: "Weekly Reading",
    type: "Reading",
    dueDate: "Every Monday",
    confidence: "Low",
    source: "Page 2",
  },
];

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="mx-auto max-w-6xl">
        <Link href="/upload" className="mb-6 inline-block text-sm text-gray-500">
          ← Back to upload
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Review extracted tasks
          </h1>

          <p className="mb-8 text-gray-600">
            Before anything is added to your dashboard, review what the AI found
            from your syllabus.
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
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {extractedTasks.map((task) => (
                  <tr key={task.title} className="border-t border-gray-200">
                    <td className="p-4 font-medium">{task.title}</td>
                    <td className="p-4">{task.type}</td>
                    <td className="p-4">{task.dueDate}</td>
                    <td className="p-4">{task.confidence}</td>
                    <td className="p-4">{task.source}</td>
                    <td className="p-4">
                      <button className="mr-2 rounded-lg bg-black px-3 py-1 text-sm text-white">
                        Approve
                      </button>
                      <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white"
            >
              Generate Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}