import readline from "readline";
import util from "util";
export type PromptForString = (prompt: string) => Promise<string>;

export function setupInput(): PromptForString {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion: PromptForString = util
    .promisify(rl.question)
    .bind(rl) as unknown as PromptForString; //TODO: bad
  return askQuestion;
}
