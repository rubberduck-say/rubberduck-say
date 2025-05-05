#!/usr/bin/env node

import chalk from "chalk";
import wrapAnsi from "wrap-ansi";
import { program } from "commander";

// 🦆 기본 메시지 리스트
const defaultMessages = [
  "Quack! Quack!",
  "오늘도 디버깅~",
  "무엇이 문제인가요?",
  "생각을 정리해봐요!",
  "오리가 도와줄게요!",
];

program
  .version("1.0.0")
  .option("-m, --message <message>", "메시지 입력")
  .parse(process.argv);

// 메시지 설정
const options = program.opts();
const message =
  options.message ||
  defaultMessages[Math.floor(Math.random() * defaultMessages.length)];

const maxLineWidth = 40;
const wrappedMessage = wrapAnsi(message, maxLineWidth, { hard: true });
const lines = wrappedMessage.split("\n");

const borderTop = `  ${"_".repeat(maxLineWidth + 2)}`;
const borderBottom = `  ${"-".repeat(maxLineWidth + 2)}`;

const balloon = lines
  .map((line) => {
    const totalPadding = maxLineWidth - line.length;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = Math.ceil(totalPadding / 2);
    return ` < ${" ".repeat(leftPadding)}${line}${" ".repeat(rightPadding)} >`;
  })
  .join("\n");

const arrow = `      ${"\\"}`;
const arrow1 = `       ${"\\"}`;

const duck = chalk.yellow(`
            _
          <(. )__
            (_(____)/
            \`-----'
`);

console.log(
  `${borderTop}\n${balloon}\n${borderBottom}\n${arrow}\n${arrow1}${duck}`
);
