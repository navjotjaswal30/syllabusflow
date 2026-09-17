export type ExtractedTask = {
  title: string;
  type:
    | "Assignment"
    | "Lab"
    | "Quiz"
    | "Exam"
    | "Presentation"
    | "Reading"
    | "Tutorial"
    | "Project"
    | "Other";
  dueDate: string;
  confidence: "High" | "Medium" | "Low";
  source: string;
  status: "Needs Review";
};

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function getWeekDateRange(startWeek: number, endWeek: number = startWeek) {
  const week2Start = new Date("2026-09-14T00:00:00");

  const startDate = new Date(week2Start);
  startDate.setDate(week2Start.getDate() + (startWeek - 2) * 7);

  const endDate = new Date(week2Start);
  endDate.setDate(week2Start.getDate() + (endWeek - 2) * 7 + 6);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return `Weeks ${startWeek}${endWeek !== startWeek ? `–${endWeek}` : ""}, approx. ${formatter.format(
    startDate
  )}–${formatter.format(endDate)}`;
}

function removeDuplicates(tasks: ExtractedTask[]) {
  const seen = new Set<string>();

  return tasks.filter((task) => {
    const key = `${task.title}-${task.type}-${task.dueDate}`.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function addTask(
  tasks: ExtractedTask[],
  task: Omit<ExtractedTask, "status">
) {
  tasks.push({
    ...task,
    status: "Needs Review",
  });
}

function extractMidterm(text: string, tasks: ExtractedTask[]) {
  const midtermMatch = text.match(
    /Midterm Test\s+22%.*?Tentative:\s*Friday,\s*Nov\.?\s*6,\s*8:00\s*[–-]\s*10:00\s*am/i
  );

  if (midtermMatch) {
    addTask(tasks, {
      title: "Midterm Test",
      type: "Exam",
      dueDate: "Friday, Nov. 6, 8:00–10:00 am",
      confidence: "High",
      source: cleanText(midtermMatch[0]),
    });
  } else if (text.toLowerCase().includes("midterm")) {
    addTask(tasks, {
      title: "Midterm Test",
      type: "Exam",
      dueDate: "Needs manual review",
      confidence: "Medium",
      source: "Found midterm reference in syllabus",
    });
  }
}

function extractFinalExam(text: string, tasks: ExtractedTask[]) {
  const finalMatch = text.match(
    /Final Examination\s+40%.*?Time and date will be announced by the University/i
  );

  if (finalMatch) {
    addTask(tasks, {
      title: "Final Examination",
      type: "Exam",
      dueDate: "Date to be announced by the University",
      confidence: "High",
      source: cleanText(finalMatch[0]),
    });
  } else if (text.toLowerCase().includes("final exam")) {
    addTask(tasks, {
      title: "Final Examination",
      type: "Exam",
      dueDate: "Needs manual review",
      confidence: "Medium",
      source: "Found final exam reference in syllabus",
    });
  }
}

function extractLabs(text: string, tasks: ExtractedTask[]) {
  const labPatterns = [
    {
      title: "Lab 1: The Photoelectric Effect",
      dueDate: getWeekDateRange(2, 3),
      pattern: /Lab 1\s+2,3\s+The Photoelectric Effect/i,
    },
    {
      title: "Lab 2: Hall Effect",
      dueDate: getWeekDateRange(4, 5),
      pattern: /Lab 2\s+4,5\s+Hall Effect/i,
    },
    {
      title: "Lab 3: The Semiconductor Diode",
      dueDate: getWeekDateRange(6, 8),
      pattern: /Lab 3\s+6,7,8.*?The Semiconductor Diode/i,
    },
    {
      title: "Lab 4: The Light Emitting Diode (LED)",
      dueDate: getWeekDateRange(8, 10),
      pattern: /Lab 4\s+8.*?9,10.*?The Light Emitting Diode/i,
    },
    {
      title: "Lab 5: MOSFET",
      dueDate: getWeekDateRange(10, 12),
      pattern: /Lab 5\s+10.*?11.*?12.*?The Metal Oxide Semiconductor Field Effect Transistor/i,
    },
  ];

  for (const lab of labPatterns) {
    const match = text.match(lab.pattern);

    if (match) {
      addTask(tasks, {
        title: lab.title,
        type: "Lab",
        dueDate: lab.dueDate,
        confidence: "High",
        source: cleanText(match[0]),
      });

      addTask(tasks, {
        title: `Pre-lab Quiz for ${lab.title}`,
        type: "Quiz",
        dueDate: `Midnight before scheduled ${lab.dueDate} lab session`,
        confidence: "Medium",
        source:
          "A pre-lab quiz based on questions from each lab manual will be due at midnight preceding your lab session.",
      });

      addTask(tasks, {
        title: `Lab Report for ${lab.title}`,
        type: "Lab",
        dueDate: `After completing scheduled ${lab.dueDate} lab session; exact D2L deadline needs review`,
        confidence: "Medium",
        source:
          "Labs include experiments and corresponding reports; submission deadlines are provided via D2L.",
      });
    }
  }
}

function extractTutorials(text: string, tasks: ExtractedTask[]) {
  const tutorialPatterns = [
    {
      title: "Tutorial 1 Quiz: Electrostatics, Photoelectric Effect, Semiconductors",
      dueDate: getWeekDateRange(2, 3),
      pattern:
        /Tutorial 1\s+2,3\s+Electrostatics, Photoelectric effect, Semiconductors and semiconductor equation/i,
    },
    {
      title: "Tutorial 2 Quiz: Ohm’s Law, Mobility, Hall Effect, Doping",
      dueDate: getWeekDateRange(4, 5),
      pattern: /Tutorial 2\s+4,5.*?Ohms.?s Law.*?Doping.*?Fermi function/i,
    },
    {
      title: "Tutorial 3 Quiz: Fermi Energy and p-n Junction",
      dueDate: getWeekDateRange(6, 7),
      pattern: /Tutorial 3\s+6,7\s+Fermi function.*?p-n junction/i,
    },
    {
      title: "Tutorial 4 Quiz: p-n Junction and Optoelectric Devices",
      dueDate: getWeekDateRange(8, 9),
      pattern: /Tutorial 4\s+8,9.*?Optoelectric devices/i,
    },
    {
      title: "Tutorial 5 Quiz: MOSFET and CMOS",
      dueDate: getWeekDateRange(10, 11),
      pattern: /Tutorial 5\s+10,11\s+Optoelectric devices, MOSFET, CMOS/i,
    },
    {
      title: "Tutorial 6 Quiz: Work Function, Flat Band, Threshold Voltage",
      dueDate: getWeekDateRange(12, 13),
      pattern: /Tutorial 6\s+12,13\s+Work function.*?MOSFET capacitance/i,
    },
  ];

  for (const tutorial of tutorialPatterns) {
    const match = text.match(tutorial.pattern);

    if (match) {
      addTask(tasks, {
        title: tutorial.title,
        type: "Tutorial",
        dueDate: tutorial.dueDate,
        confidence: "High",
        source: cleanText(match[0]),
      });
    }
  }
}

function extractDropDeadline(text: string, tasks: ExtractedTask[]) {
  const dropMatch = text.match(
    /deadline to drop a course in good academic standing is Friday,?\s*November\s*20,?\s*2026/i
  );

  if (dropMatch) {
    addTask(tasks, {
      title: "Deadline to drop course in good academic standing",
      type: "Other",
      dueDate: "Friday, November 20, 2026",
      confidence: "High",
      source: cleanText(dropMatch[0]),
    });
  }
}

function extractGradingTasks(text: string, tasks: ExtractedTask[]) {
  if (text.match(/Tutorials\s+10%\s+2%\s+each\s+5 Tutorial Quizzes/i)) {
    addTask(tasks, {
      title: "Complete tutorial quizzes",
      type: "Quiz",
      dueDate: "Best 5 of 6 tutorial quizzes throughout term",
      confidence: "High",
      source: "Tutorials are worth 10%; 2% each; best 5 of 6 tutorial quizzes.",
    });
  }

  if (text.match(/Laboratory\s+20%.*?5 Lab Reports and Quizzes/i)) {
    addTask(tasks, {
      title: "Complete 5 lab reports and lab quizzes",
      type: "Lab",
      dueDate: "Throughout lab schedule; exact D2L deadlines need review",
      confidence: "High",
      source: "Laboratory is worth 20%; includes 5 lab reports and quizzes.",
    });
  }

  if (text.match(/Classroom Response\s+8%/i)) {
    addTask(tasks, {
      title: "Complete lecture iClicker / classroom response questions",
      type: "Other",
      dueDate: "During lectures throughout the semester",
      confidence: "Medium",
      source: "Classroom Response is worth 8%; lecture iClicker component.",
    });
  }
}

export function mockExtractTasks(text: string): ExtractedTask[] {
  const tasks: ExtractedTask[] = [];

  extractMidterm(text, tasks);
  extractFinalExam(text, tasks);
  extractLabs(text, tasks);
  extractTutorials(text, tasks);
  extractDropDeadline(text, tasks);
  extractGradingTasks(text, tasks);

  const cleanedTasks = removeDuplicates(tasks);

  if (cleanedTasks.length === 0) {
    return [
      {
        title: "Review syllabus manually",
        type: "Other",
        dueDate: "Needs manual review",
        confidence: "Low",
        source: "No structured coursework items were detected automatically.",
        status: "Needs Review",
      },
    ];
  }

  return cleanedTasks;
}