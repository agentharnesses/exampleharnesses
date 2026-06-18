# Example Harnesses

A collection of example agent harnesses built to the [agentharnesses.io](https://agentharnesses.io) specification.

## What is an Agent Harness?

An agent harness is a standardized way to give an AI agent a role, context, and capabilities. Rather than loading everything upfront, the agent pulls in only the skills and references needed for each task. A harness represents a complete role; skills are the individual capabilities that role requires.

## Examples

| Harness | Description |
|---|---|
| [content-creation-harness](./content-creation-harness/) | Writing, editing, and publishing across formats and channels |

## Structure

Each harness follows the standard layout:

```
example-harness/
├── HARNESS.md        # Agent role definition and context
├── skills/           # Atomic capabilities
└── references/       # Supporting documentation
```

`SKILLS.md` and `REFERENCES.md` index files are used within their respective directories to aid routing — agents read these summaries to determine which skills or references are relevant to a task without opening every file.
