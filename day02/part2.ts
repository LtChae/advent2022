// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
import * as fs from "fs";
import * as path from "path";

const codes: { [key: string]: string } = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "lose",
  Y: "draw",
  Z: "win",
};

const shapeScores: { [key: string]: number } = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

function beats(shape: string) {
  switch (shape) {
    case "rock":
      return "paper";
    case "paper":
      return "scissors";
    case "scissors":
      return "rock";
    default:
      return "crap"
  }
}

function loses(shape: string) {
  switch (shape) {
    case "rock":
      return "scissors";
    case "paper":
      return "rock";
    case "scissors":
      return "paper";
    default:
      return "crap"
  }
}

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
let rounds = inputData
  .split("\n")
  .filter((x) => x)
  .map((round) => {
    let [opponent, goal] = round.split(" ");
    return [codes[opponent], codes[goal]];
  })
  .map(([opponent, goal]) => {
    switch (goal) {
      case "draw":
        return [opponent, opponent];
      case "win":
        return [opponent, beats(opponent)];
      case "lose":
        return [opponent, loses(opponent)];
      default:
        return ["oh", "no"];
    }
  });
let score = rounds.reduce((acc: number, round: string[]) => {
  let [opponent, yours] = round;
  let outcome = 0;
  switch (true) {
    case opponent == yours:
      outcome = 3;
      break;
    case opponent == "rock" && yours == "scissors":
      outcome = 0;
      break;
    case opponent == "rock" && yours == "paper":
      outcome = 6;
      break;
    case opponent == "paper" && yours == "rock":
      outcome = 0;
      break;
    case opponent == "paper" && yours == "scissors":
      outcome = 6;
      break;
    case opponent == "scissors" && yours == "paper":
      outcome = 0;
      break;
    case opponent == "scissors" && yours == "rock":
      outcome = 6;
      break;
  }
  console.log(opponent, yours, outcome);
  return acc + outcome + shapeScores[yours];
}, 0);

console.log(score);
