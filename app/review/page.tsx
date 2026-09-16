"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  title: string;
  type: string;
  dueDate: string;
  confidence: string;
  source: string;
  status: string;
};

export default function ReviewPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function approveTask(taskTitle: string) {
  const updatedTasks = tasks.map((task) => {
    if (task.title === taskTitle) {
      return {
        ...task,
        status: "Approved",
      };
    }

    return task;
  });

  setTasks(updatedTasks);
  localStorage.setItem("syllabusflow_tasks", JSON.stringify(updatedTasks));
}

  useEffect(() => {
    const savedTasks = localStorage.getItem("syllabusflow_tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

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
            Before anything is added to your dashboard, review what SyllabusFlow
            found from your syllabus.
          </p>

          {tasks.length === 0 ? (
            <div className="rounded-2xl bg-gray-100 p-6">
              <p className="text-gray-700">
                No extracted tasks found yet. Go back to the upload page and
                extract tasks from a syllabus first.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Task</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Confidence</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
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
                      <td className="p-4">{task.status}</td>
                      <td className="p-4">
                        <button
                            onClick={() => approveTask(task.title)}
                            className="mr-2 rounded-lg bg-black px-3 py-1 text-sm text-white"
                        >
                            {task.status === "Approved" ? "Approved" : "Approve"}
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
          )}

          {tasks.length > 0 && (
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="rounded-xl bg-black px-6 py-3 font-medium text-white"
              >
                Generate Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}