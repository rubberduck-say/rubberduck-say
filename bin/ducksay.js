#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import stringWidth from "string-width";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI option
program
  .version("1.0.0")
  .option("-m, --message <message>", "메시지 입력")
  .option("--lang <lang>", "언어 설정 (ko | en)", "en")
  .parse(process.argv);

const options = program.opts();
const rawLang = options.lang;
const isValidLang = ["ko", "en"].includes(rawLang);
const lang = isValidLang ? rawLang : "en";

if (!isValidLang) {
  console.warn(
    `Unsupported language code '${rawLang}'  '${lang}'Replace with.`
  );
}

function loadMessages(lang) {
  try {
    const filePath = path.join(__dirname, "..", "i18n", `${lang}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).messages;
  } catch (err) {
    console.warn(
      `Unsupported language code '${rawLang}'  '${lang}'Replace with.`
    );

    return lang === "ko"
      ? [
          "꿱꿱",
          "오늘도 디버깅~",
          "무엇이 문제인가요?",
          "생각을 정리해봐요!",
          "오리가 도와줄게요!",
        ]
      : [
          "Quack! Quack!",
          "Debugging today!",
          "What seems to be the problem?",
          "Let’s think it through!",
          "I’m here to help!",
        ];
  }
}

// choose a message
const messages = loadMessages(lang);
const message =
  options.message ||
  messages[Math.floor(Math.random() * messages.length)] ||
  "Quack!";

const maxLineWidth = 40;
function wrapTextByWidth(text, maxWidth) {
  const lines = [];
  let currentLine = "";
  let currentWidth = 0;

  for (const char of text) {
    const charWidth = stringWidth(char);
    if (currentWidth + charWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = char;
      currentWidth = charWidth;
    } else {
      currentLine += char;
      currentWidth += charWidth;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

const lines = wrapTextByWidth(message, maxLineWidth);

// create speech bubble
const borderTop = `  ${"_".repeat(maxLineWidth + 2)}`;
const borderBottom = `  ${"-".repeat(maxLineWidth + 2)}`;
const balloon = lines
  .map((line) => {
    const padding = maxLineWidth - stringWidth(line);
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = Math.ceil(padding / 2);
    return ` < ${" ".repeat(leftPadding)}${line}${" ".repeat(rightPadding)} >`;
  })
  .join("\n");

// create duck
const duck = chalk.yellow(`
      \\
       \\
            _
          <(. )__
            (_(____)/
            \`-----'
`);

console.log(`${borderTop}\n${balloon}\n${borderBottom}${duck}`);
