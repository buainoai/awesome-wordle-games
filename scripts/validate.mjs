#!/usr/bin/env node
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const data = JSON.parse(readFileSync(new URL("games.json", root), "utf8"));
const readme = readFileSync(new URL("README.md", root), "utf8");
const failures = [];
const ids = new Set();
const urls = new Set();
const allowedModes = new Set(["daily", "unlimited", "practice"]);
const categoryIds = new Set(data.categories.map((category) => category.id));

if (data.schemaVersion !== 1) failures.push("Unsupported schemaVersion");
if (!Array.isArray(data.games)) failures.push("games must be an array");
if (!Array.isArray(data.categories)) failures.push("categories must be an array");

for (const game of data.games ?? []) {
  const label = game.id ?? game.name ?? "(unnamed)";
  if (typeof game.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.id)) {
    failures.push(`${label}: invalid id`);
  }
  if (ids.has(game.id)) failures.push(`${label}: duplicate id`);
  ids.add(game.id);

  if (typeof game.name !== "string" || !game.name.trim()) failures.push(`${label}: missing name`);
  if (typeof game.description !== "string" || !game.description.trim()) failures.push(`${label}: missing description`);
  if (typeof game.language !== "string" || !game.language.trim()) failures.push(`${label}: missing language`);
  if (!categoryIds.has(game.category)) failures.push(`${label}: unknown category`);

  try {
    const parsed = new URL(game.url);
    if (parsed.protocol !== "https:") failures.push(`${label}: URL must use https`);
    if (parsed.search) failures.push(`${label}: remove query parameters from URL`);
    const canonical = parsed.hostname.replace(/^www\./, "").toLowerCase() + parsed.pathname.replace(/\/$/, "");
    if (urls.has(canonical)) failures.push(`${label}: duplicate URL`);
    urls.add(canonical);
    if (!readme.includes(`](${game.url})`)) failures.push(`${label}: missing link in README.md`);
  } catch {
    failures.push(`${label}: invalid URL`);
  }

  if (!Array.isArray(game.modes) || game.modes.some((mode) => !allowedModes.has(mode))) {
    failures.push(`${label}: invalid modes`);
  }
}

if (failures.length > 0) {
  console.error(`Validation failed:\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${data.games.length} games across ${data.categories.length} categories`);
}
