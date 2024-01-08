import { promises as fs } from "fs";
import Snippet from "./snippet.mjs";

const SNIPPETS_FILE = "snippets.json";

async function readSnippets() {
  try {
    const data = await fs.readFile(SNIPPETS_FILE, "utf-8");
    return JSON.parse(data) || [];
  } catch (err) {
    return [];
  }
}

async function writeSnippets(snippets) {
  await fs.writeFile(
    SNIPPETS_FILE,
    JSON.stringify(
      snippets,
      (key, value) => (value === undefined ? null : value),
      2
    )
  );
}

function getNextId(snippets) {
  return snippets.length > 0 ? snippets[snippets.length - 1].id + 1 : 1;
}

async function createSnippet(content, label) {
  // Read the file first so that it is up to date and we don't overwrite (concurrency)
  const snippets = await readSnippets();
  const id = getNextId(snippets);
  const newSnippet = new Snippet(id, content, label);
  snippets.push(newSnippet);
  await writeSnippets(snippets);
  return newSnippet;
}

async function listSnippets(label) {
  const snippets = await readSnippets();
  // If there is a label given, we return all the snippets with that label; else, we give all the snippets
  return label
    ? snippets.filter((snippet) => snippet.label === label)
    : snippets;
}

async function deleteSnippets(id) {
  const snippets = await readSnippets();
  // If id matches, then delete the snippet from the file
  const index = snippets.findIndex((snippet) => snippet.id === id);
  // If index is found, we delete it
  if (index !== -1) {
    snippets.splice(index, 1);
    await writeSnippets(snippets);
    return true;
  }
  return false;
}

export { createSnippet, listSnippets, deleteSnippets };
