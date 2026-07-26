---
name: Imported project workflows
description: Replit runtime behavior to account for when setting up imported multi-artifact projects.
---

Imported projects can contain valid `.replit-artifact/artifact.toml` files without those artifacts being registered in the current Replit runtime. In that state, managed artifact workflow names are unavailable, so setup should use the existing application commands in minimal `.replit` workflows rather than creating new app structure.

**Why:** The imported workspace exposed artifact metadata on disk but returned no registered artifacts, while the application itself ran correctly once its existing `PORT` and `BASE_PATH` requirements were supplied.

**How to apply:** Check `listArtifacts()` before using managed workflow names. If it is empty, configure only the necessary frontend/backend workflows, explicitly provide required runtime variables, and preserve the imported artifact files.