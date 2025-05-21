#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import stringWidth from "string-width";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI options
program
  .version("1.0.0")
  .option(
    "--color <color>",
    "Duck color (yellow, green, blue, cyan, magenta, red, white)",
    "yellow"
  )
  .option("--lang <lang>", "Language setting (ko | en)", "en")
  .option("-m, --message <message>", "Custom message")
  .parse(process.argv);

const options = program.opts();
const color = options.color; // ✅ Declare color
const rawLang = options.lang;
const isValidLang = ["ko", "en"].includes(rawLang);
const lang = isValidLang ? rawLang : "en";

// Warn if unsupported language
if (!isValidLang) {
  console.warn(
    `⚠️  Unsupported language code '${rawLang}'. Falling back to '${lang}'.`
  );
}

// Validate duck color
const validColors = [
  "yellow",
  "green",
  "blue",
  "cyan",
  "magenta",
  "red",
  "white",
];

let duckColor = "yellow";
if (typeof color === "string" && validColors.includes(color)) {
  duckColor = color;
} else if (color !== undefined) {
  console.warn(`⚠️  Unsupported color '${color}'. Defaulting to 'yellow'.`);
}

// Load messages from i18n JSON file or fallback to defaults
function loadMessages(lang) {
  try {
    const filePath = path.join(__dirname, "..", "i18n", `${lang}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).messages;
  } catch (err) {
    console.warn(
      `⚠️  Failed to load language file. Using default messages instead.`
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

// Choose the message
const messages = loadMessages(lang);
const message =
  options.message ||
  messages[Math.floor(Math.random() * messages.length)] ||
  "Quack!";

// Word-wrapping function (multibyte-aware)
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

// Create speech bubble
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

// Create duck ASCII art with color
const duck = chalk[duckColor](`
      \\
       \\
            _
          <(. )__
            (_(____)/
            \`-----'
`);

// Output result
console.log(`${borderTop}\n${balloon}\n${borderBottom}${duck}`);
