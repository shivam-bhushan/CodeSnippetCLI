import { program } from "commander";
import "./cli.mjs"; // Import CLI commands from cli.mjs

// Set the version and description for your CLI application
program.version("1.0.0").description("Code Snippet Manager CLI");

// Parse the command-line arguments
program.parse(process.argv);
