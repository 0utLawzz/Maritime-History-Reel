## Summary

<!-- What does this PR do? One or two sentences. -->

## Type of change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that causes existing functionality to break)
- [ ] 📝 Documentation update
- [ ] 🎨 Style / design change
- [ ] 🔧 Chore / maintenance

## Version bump

- [ ] MAJOR — breaking API or DB change → `vX.0.0`
- [ ] MINOR — new feature → `vX.Y.0`
- [ ] PATCH — bug fix or docs → `vX.Y.Z`
- [ ] No version bump needed

## Checklist

- [ ] `pnpm run typecheck` passes
- [ ] `pnpm --filter @workspace/api-spec run codegen` re-run (if I changed `openapi.yaml`)
- [ ] `pnpm --filter @workspace/db run push` run against dev DB (if I changed the schema)
- [ ] `CHANGELOG.md` updated (for feature/fix PRs)
- [ ] No hardcoded secrets or credentials in code
- [ ] No `any` types added without justification

## How to test

<!-- Steps for a reviewer to verify the change works -->
1. 
2. 

## Screenshots (if UI change)

<!-- Before / After screenshots help reviewers a lot -->

## Related issues

<!-- Closes #123 -->
