#!/usr/bin/env node

import chalk from "chalk";
import wrapAnsi from "wrap-ansi";
import stringWidth from "string-width"; // 중앙 정렬 정확도 향상

// 🦆 기본 메시지 리스트
const defaultMessages = [
  "Quack! Quack!",
  "오늘도 디버깅~",
  "무엇이 문제인가요?",
  "생각을 정리해봐요!",
  "오리가 도와줄게요!",
];

// 입력값 처리
const input = process.argv.slice(2).join(" ");
const message =
  input || defaultMessages[Math.floor(Math.random() * defaultMessages.length)];

// 말풍선 설정
const maxLineWidth = 40;
const wrapped = wrapAnsi(message, maxLineWidth, { hard: true });
const lines = wrapped.split("\n");

// 테두리
const borderTop = `  ${"_".repeat(maxLineWidth + 2)}`;
const borderBottom = `  ${"_".repeat(maxLineWidth + 2)}`;

// 말풍선 본문 중앙 정렬
const balloon = lines
  .map((line) => {
    const width = stringWidth(line);
    const padLeft = Math.floor((maxLineWidth - width) / 2);
    const padRight = maxLineWidth - width - padLeft;
    return ` < ${" ".repeat(padLeft)}${line}${" ".repeat(padRight)} >`;
  })
  .join("\n");

// 오리 아트
const duck = chalk.yellow(`
        \\
         \\  
            _
          <(. )__
            (_(____)/
            \`-----'
`);

// 출력
console.log(`${borderTop}\n${balloon}\n${borderBottom}\n${duck}`);
