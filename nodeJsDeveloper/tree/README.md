# Tree
Tree CLI is a tree display tool.

## Installation

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Link the project globally to make the `tree` command available on your system:
   ```bash
   npm link
   ```
   This step allows you to run the `tree` command from anywhere in your terminal.

## Usage
To start using Tree CLI, run:

```bash
tree --help
```

### Commands
#### Show json structure:
```bash
tree -s json -p /Users/tree/resources/index.json -d 10
```
#### Show directory file structure:
```bash
tree -s directory -p /Users/OTUS/Projects/otus/nodeJsDeveloper/tree -d 2
```

For more detailed information on commands, run `tree --help`.
