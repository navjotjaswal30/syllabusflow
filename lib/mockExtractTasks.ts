export type ExtractedTask = {
  title: string;
  type: "Assignment" | "Lab" | "Quiz" | "Exam" | "Presentation" | "Reading" | "Tutorial" | "Other";
  dueDate: string;
  confidence: "High" | "Medium" | "Low";
  source: string;
  status: "Needs Review";
};

export function mockExtractTasks(text: string): ExtractedTask[] {
  const lowerText = text.toLowerCase();

  const tasks: ExtractedTask[] = [];

  if (lowerText.includes("midterm")) {
    tasks.push({
      title: "Midterm Exam",
      type: "Exam",
      dueDate: "Needs manual review",
      confidence: "Medium",
      source: "Found keyword: midterm",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("final exam") || lowerText.includes("final examination")) {
    tasks.push({
      title: "Final Exam",
      type: "Exam",
      dueDate: "Needs manual review",
      confidence: "Medium",
      source: "Found keyword: final exam",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("assignment")) {
    tasks.push({
      title: "Course Assignment",
      type: "Assignment",
      dueDate: "Needs manual review",
      confidence: "Low",
      source: "Found keyword: assignment",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("lab") || lowerText.includes("laboratory")) {
    tasks.push({
      title: "Lab Component",
      type: "Lab",
      dueDate: "Needs manual review",
      confidence: "Low",
      source: "Found keyword: lab/laboratory",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("quiz")) {
    tasks.push({
      title: "Course Quiz",
      type: "Quiz",
      dueDate: "Needs manual review",
      confidence: "Low",
      source: "Found keyword: quiz",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("presentation")) {
    tasks.push({
      title: "Presentation",
      type: "Presentation",
      dueDate: "Needs manual review",
      confidence: "Low",
      source: "Found keyword: presentation",
      status: "Needs Review",
    });
  }

  if (lowerText.includes("reading") || lowerText.includes("readings")) {
    tasks.push({
      title: "Weekly Reading",
      type: "Reading",
      dueDate: "Recurring / needs review",
      confidence: "Low",
      source: "Found keyword: reading",
      status: "Needs Review",
    });
  }

  if (tasks.length === 0) {
    tasks.push({
      title: "Review syllabus manually",
      type: "Other",
      dueDate: "Needs manual review",
      confidence: "Low",
      source: "No common coursework keywords found",
      status: "Needs Review",
    });
  }

  return tasks;
}