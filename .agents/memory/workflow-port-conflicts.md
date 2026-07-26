---
name: Workflow Port Conflicts
description: Avoiding EADDRINUSE when switching between manual and managed artifact workflows.
---

## Problem

When a manually-created workflow (e.g., `configureWorkflow`) is removed and replaced by a managed artifact workflow, the underlying process can keep running. The new managed workflow then fails with `EADDRINUSE` on the artifact's assigned port.

## Why it happens

`removeWorkflow` stops the workflow manager but may leave the child `pnpm`/`node` process alive. The orphaned process continues to bind the port, so the new workflow cannot start.

## How to apply

1. Find the orphaned process: `ps aux | grep <service-name>` or `fuser <port>/tcp`
2. Kill the `pnpm`/`node` process holding the port
3. Verify the port is free: `curl` or `fuser` should return nothing
4. Restart the managed artifact workflow with `WorkflowsRestart`

Prefer managed artifact workflows once artifacts are registered; avoid creating manual workflows with the same port.
