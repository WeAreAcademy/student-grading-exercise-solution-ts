import { setupInput } from "./setupInput";
import {
  compileGrades,
  printListOfAllStudents,
  printReportFor,
  NamedGrade,
} from "./gradesUtils";
import allGradesArray from "./grades.json";

async function mainProgram() {
  const askQuestion = setupInput();

  const allGradesDict = compileGrades(allGradesArray as NamedGrade[]);

  try {
    while (true) {
      printListOfAllStudents(allGradesDict);

      const studentName = await askQuestion("Enter student name from list: ");
      if (allGradesDict[studentName]) {
        printReportFor(studentName, allGradesDict);
      }
    }
  } catch (err) {
    console.error("Error when reading input: ", err);
  }
}

mainProgram();
