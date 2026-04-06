# Security Policy

## Supported Versions

`textmode.js` is still in active pre-`1.0` development.
Security fixes are provided only for the most recent releases on active channels.

| Version / Channel | Supported |
| --- | --- |
| Latest release from `main` | Yes |
| Current prerelease from `beta` | Yes |
| Older releases and prereleases | No |
| `dev` branch snapshots, forks, and local modifications | No |

If you are unsure whether your issue affects a supported version, report it anyway.
We would rather review a false alarm than miss a real vulnerability.

## Reporting a Vulnerability

Please report suspected vulnerabilities privately to
[hello@textmode.art](mailto:hello@textmode.art).

Do not open a public GitHub issue, pull request, discussion, or Discord thread for security
reports. Public reports can put users at risk before a fix is available.

Include as much of the following as you can:

- A clear description of the issue and the affected component
- The `textmode.js` version, browser, runtime, operating system, and integration details
- Reproduction steps or a minimal proof of concept
- The expected impact and any realistic attack scenario
- Any mitigation ideas or candidate fixes you have already identified

If the report includes sensitive material, secrets, private project code, or exploit details,
mention that clearly in the email.

## What to Expect

The maintainers will make a best effort to:

- Acknowledge receipt within 5 business days
- Triage and reproduce the issue
- Keep you informed as the investigation progresses
- Prepare and release a fix for supported versions when the report is confirmed

Response times can vary depending on severity, maintainer availability, and the complexity of the
affected code path.

## Disclosure Process

`textmode.js` follows coordinated disclosure.

- Please give the maintainers reasonable time to investigate and ship a fix before public
  disclosure.
- Once a fix is available, the project may publish release notes, a changelog entry, or a GitHub
  security advisory summarizing the issue.
- Reporter credit will be included when appropriate and when the reporter wants to be named.

## Scope

This policy covers security issues in:

- The source code in this repository
- Official npm releases published for `textmode.js`
- Official examples and project-maintained documentation tied directly to this codebase

This policy does not cover:

- Vulnerabilities in third-party services, browsers, operating systems, or dependencies outside the
  project's control
- Security issues introduced only in downstream forks or private integrations
- General support questions, API usage questions, or feature requests

For non-security bugs, use the public GitHub issue templates instead.
