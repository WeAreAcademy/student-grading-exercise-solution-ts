import readline from "readline";
import util from "util";
export type PromptForString = (prompt: string) => Promise<string>;

export function setupInput(): PromptForString {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  type StandardCallbackForm = (err: string | null, answer: string) => void;
  type CorrectedQuestionForm = (
    prompt: string,
    callback: StandardCallbackForm,
  ) => void;

  const betterQuestion: CorrectedQuestionForm = (prompt, standardCallback) =>
    rl.question(prompt, (answer) => standardCallback(null, answer));

  const askQuestion = util.promisify(betterQuestion).bind(rl);
  return askQuestion;
}
