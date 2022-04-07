import {
  compileGrades,
  buildSubjectResultsDict,
  buildListOfAllStudents,
  CompiledGradesDict,
  NamedGrade,
  SubjectScore,
} from "./gradesUtils";

test("buildListOfAllStudents", async function () {
  const input: CompiledGradesDict = {
    storm: [
      ["science", 100],
      ["p.e.", 100],
    ],
    bruce: [["math", 10]],
  };
  const expectedOutput = ["student names:", "bruce", "storm"];
  expect(buildListOfAllStudents(input)).toEqual(expectedOutput);
});

describe("buildSubjectResults", () => {
  test("ForStorm", async function () {
    const input: SubjectScore[] = [
      ["meteorology", 90],
      ["swahili", 90],
      ["meteorology", 100],
      ["russian", 90],
      ["meteorology", 100],
      ["swahili", 100],
    ];
    const expectedOutput = {
      meteorology: [90, 100, 100],
      swahili: [90, 100],
      russian: [90],
    };
    expect(buildSubjectResultsDict(input)).toEqual(expectedOutput);
  });

  test("ForNoExams", async function () {
    expect(buildSubjectResultsDict([])).toEqual({});
  });
});
describe("compile-grades", () => {
  test("for-multiple-students-multiple-results", async function () {
    const input: NamedGrade[] = [
      ["bruce", "anger management", 0],
      ["storm", "science", 80],
      ["bruce", "anger management", 10],
    ];
    const expectedOutput = {
      bruce: [
        ["anger management", 0],
        ["anger management", 10],
      ],
      storm: [["science", 80]],
    };
    expect(compileGrades(input)).toEqual(expectedOutput);
  });

  test("compiled-grades-for-two-inputs-same-student", async function () {
    const input: NamedGrade[] = [
      ["bruce", "anger management", 0],
      ["bruce", "anger management", 10],
    ];
    const expectedOutput = {
      bruce: [
        ["anger management", 0],
        ["anger management", 10],
      ],
    };
    expect(compileGrades(input)).toEqual(expectedOutput);
  });

  test("for-one-result", async function () {
    const input: NamedGrade[] = [["bruce", "anger management", 0]];
    const expectedOutput = {
      bruce: [["anger management", 0]],
    };
    expect(compileGrades(input)).toEqual(expectedOutput);
  });

  test("for-empty-input", async function () {
    expect(compileGrades([])).toEqual({});
  });
});
