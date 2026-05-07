# PR #591 monitor (GitHub Actions + Gmail)

This repo can monitor upstream PR **santifer/career-ops#591** on a schedule and email you when the PR state/checks change.

## Setup (fork)

1. Add this workflow to your fork (it lives at `.github/workflows/monitor-pr-591.yml`).
2. In your fork on GitHub: **Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

- `GMAIL_SMTP_USERNAME`: your Gmail address (example: `you@gmail.com`)
- `GMAIL_SMTP_APP_PASSWORD`: a Gmail **App password** (not your normal password)
- `PR_MONITOR_EMAIL_TO`: comma-separated recipients (example: `you@gmail.com`)

## Gmail App password

Gmail SMTP in GitHub Actions requires an App password:

1. Enable Google 2‑Step Verification on your account.
2. Create an App password for “Mail”.
3. Use that 16‑character value for `GMAIL_SMTP_APP_PASSWORD`.

## Run it

- Manual: Actions → “Monitor upstream PR #591” → Run workflow
- Scheduled: runs every 6 hours (see cron in `.github/workflows/monitor-pr-591.yml`)

## Behavior

- Sends an email only when the PR snapshot changes (state, review decision, mergeable, or check status list).
- Update the schedule by editing the cron expression in `.github/workflows/monitor-pr-591.yml`.

