# Content Creation Harness

An example agent harness for content creation — writing, editing, and publishing across formats and channels.

## Structure

```
content-creation-harness/
├── HARNESS.md        # Agent role definition and context
├── skills/           # Atomic capabilities (writing, editing, SEO, etc.)
└── references/       # Brand voice, style guides, audience profiles
```

## Usage

Point your agent at this harness to give it a content creation role. The agent loads `HARNESS.md` on startup and pulls in individual skills and references progressively as tasks require them.

See the [repo README](../README.md) for more examples and the [agentharnesses.io](https://agentharnesses.io) spec for full documentation.
