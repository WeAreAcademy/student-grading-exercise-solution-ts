// https://replit.com/@NeillBogie/LiveCodingStudentGradesCohort4

import { calcAverage } from "./math";

export type StudentName = string;
export type SubjectName = string;
export type Score = number;
export type SubjectScore = [SubjectName, Score];
export type NamedGrade = [StudentName, SubjectName, Score];
export type CompiledGradesDict = { [key: string]: SubjectScore[] };
export type SubjectResultsDict = {
  [key: string]: Score[];
};
export function compileGrades(
  allGradesArray: NamedGrade[],
): CompiledGradesDict {
  /*
          declare compiledDict = {}
          for each result of allGradesArray
              declare studentName, subjectName, score as elements of result
              incorporate result into compiledDict:
              if compiledDict does not have key studentName        
                  add new property: compiledDict[subjectName] = []
              push [subjectName, score] onto compiledDict[studentName]
          
          
          return compiledDict
          */

  const compiledDict: CompiledGradesDict = {};

  for (const oneExamData of allGradesArray) {
    const [studentName, subjectName, score] = oneExamData;
    if (compiledDict[studentName] === undefined) {
      compiledDict[studentName] = [];
    }
    const examResult: SubjectScore = [subjectName, score];
    compiledDict[studentName].push(examResult);
  }
  return compiledDict;
}

export function printListOfAllStudents(gradesDict: CompiledGradesDict): void {
  const lines = buildListOfAllStudents(gradesDict);
  for (const line of lines) {
    console.log(line);
  }
  console.log("");
}

export function buildListOfAllStudents(
  gradesDict: CompiledGradesDict,
): string[] {
  const lines = [];
  lines.push("student names:");
  for (const name of Object.keys(gradesDict).sort()) {
    lines.push(name);
  }
  return lines;
}

export function printReportFor(
  studentName: StudentName,
  gradesDict: CompiledGradesDict,
): void {
  console.log("========== " + studentName + "'s grades: ==========");

  //build subjectResultsDict: a dictionary of exam results by subject
  const examResultsForStudent = gradesDict[studentName];

  const subjectResultsDict = buildSubjectResultsDict(examResultsForStudent);

  //example of subjectResultsDict:
  // {
  //     meteorology: [90, 100, 100],
  //     swahili: [90, 100],
  //     russian: [90]
  // };

  //for each [subjectName, scores] of subjectResultsDict entries
  //
  //    average = calculate the average from scores
  //    log the subject name
  //    log the average

  const entries = Object.entries(subjectResultsDict);

  for (const [subjectName, scores] of entries) {
    const avgStr = calcAverage(scores).toFixed(2);
    console.log(`** ${subjectName}: ${avgStr}%`);
  }
  console.log("");
}

export function buildSubjectResultsDict(
  examResults: SubjectScore[],
): SubjectResultsDict {
  // subjectResultsDict = {}
  // for each entry in examResults
  //    subjectName, score = entry
  //    if subjectName is not a key in subjectResultsDict
  //        subjectResultsDict[subjectName] = []
  //
  //    subjectResultsDict[subjectName].push(score)
  // return subjectResultsDict

  const dict: SubjectResultsDict = {};
  for (const entry of examResults) {
    const [subjectName, score] = entry;
    if (dict[subjectName] === undefined) {
      dict[subjectName] = [];
    }
    dict[subjectName].push(score);
  }
  return dict;
}
