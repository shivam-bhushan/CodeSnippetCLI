# Code Snippet CLI

Command Line Interface (CLI) for managing your frequently used code snippets.

## Installation

Install the Code Snippet CLI globally using npm:

```bash
npm install -g codesnippetcli
```



## Usage

### Save a snippet

To save a new code snippet, use the following command:

```bash
codesnippetcli save "function example() { // Your code here }" -l "JavaScript"
```

Replace the content within double quotes with your code snippet, and optionally provide a label using the -l flag.

### List Snippets

List all saved code snippets with the following command:

```bash
codesnippetcli list
```
Optionally, you can filter snippets by label:
```bash
codesnippetcli list -l "JavaScript"
```

### Delete a Snippet
Delete a code snippet by providing its ID:

```bash
codesnippetcli delete <id>
```
Replace <id> with the actual ID of the snippet you want to delete.

## Example
```bash

# Save a JavaScript snippet
codesnippetcli save "function example() { // Your code here }" -l "JavaScript"

# List all snippets
codesnippetcli list

# Delete a snippet
codesnippetcli delete 1