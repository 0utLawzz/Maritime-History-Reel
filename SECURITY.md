# Security Policy

## Supported Versions

Only the latest release on the `main` branch is actively supported with security updates. If you are running an older version, please upgrade.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| older   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it privately.

- **Email:** security@your-org.com (replace with your maintainer contact)
- **GitHub:** Open a [private security advisory](https://github.com/YOUR_ORG/YOUR_REPO/security/advisories/new) (requires repository access)

Please include:
- A clear description of the issue
- Steps to reproduce, if applicable
- Affected versions, files, or dependencies
- Suggested remediation, if you have one

We aim to acknowledge reports within 72 hours and release a fix or mitigation as soon as possible.

## Security Best Practices

- Never commit secrets, API keys, or database credentials to the repository. Use Replit Secrets or your environment's vault.
- Keep dependencies up to date. Run `pnpm audit` regularly and review Dependabot alerts.
- The API server intentionally redacts `Authorization` and `Cookie` headers from logs.
- All API inputs are validated with Zod before reaching the database.
