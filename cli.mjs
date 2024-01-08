#!/usr/bin/env node
import chalk from "chalk";
import {
  createSnippet,
  listSnippets,
  deleteSnippets,
} from "./snippetManager.mjs";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";

const argv = yargs(hideBin(process.argv))
  .command(
    "save <content>",
    "Save your snippets",
    (yargs) => {
      yargs.option("l", {
        alias: "label",
        describe: "Specify a label",
      });
    },
    async (argv) => {
      const { content, label } = argv;
      try {
        const snippet = await createSnippet(content, label);
        console.log(chalk.green(`Saved snippet with id ${snippet.id}`));
      } catch (error) {
        console.error(
          chalk.red("There was an error saving the snippet : ", error.message)
        );
      }
    }
  )
  .command(
    "list",
    "List all saved snippets",
    (yargs) => {
      yargs.option("l", {
        alias: "label",
        describe: "Filter by label",
      });
    },
    async (argv) => {
      const { label } = argv;
      try {
        const snippet = await listSnippets(label);
        if (snippet.length == 0) {
          console.log(chalk.yellow("No saved snippets found"));
        } else {
          console.log(chalk.blue("Listing all saved snippets :"));
          snippet.forEach((snippet) => {
            console.log(
              `ID : ${snippet.id} - label ${snippet.label} - Timestamp ${snippet.timestamp}`
            );
            console.log(chalk.cyan(snippet.content));
            console.log();
          });
        }
      } catch (error) {
        console.error(
          chalk.red(
            "There was an error trying to display the snippets",
            error.message
          )
        );
      }
    }
  )
  .command(
    "delete <id>",
    "This command deletes the snippet",
    {},
    async (argv) => {
      const { id } = argv;
      try {
        const success = await deleteSnippets(parseInt(id, 10));
        if (success) {
          console.log(
            chalk.green(`Snippet with ID ${id} successfully deleted`)
          );
        } else {
          console.log(chalk.yellow(`Snippet with ID ${id} not found`));
        }
      } catch (error) {
        console.error(chalk.red("Error deleting snippet", error.message));
      }
    }
  )
  .help().argv;
