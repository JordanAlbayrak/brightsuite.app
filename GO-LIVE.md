# Going live

Jordan's call, after he has seen the screenshots. Nothing below has been done yet.

## Before

1. BrightQueue privacy page (`src/privacy-queue.mjs`) is a DRAFT: choose a public contact address (replaces the `[contact address, to be chosen]` placeholder), and update the Sentry section once BrightQ ticket T3 (Sentry opt-in or removal) lands. Then remove the DRAFT note, the `noindex` flag in `src/pages.mjs`, "(draft)" in the home card, and rebuild.
2. `node build.mjs`, then run gitleaks: `gitleaks git --redact -v .` (exe under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gitleaks.Gitleaks_*\gitleaks.exe`). Expect "no leaks found".

## 1. Public repo

    gh repo create JordanAlbayrak/brightsuite.app --public --source . --remote origin --push

(Any repo name works; the custom domain decides the URL.)

## 2. Verify the domain on the account (first, so nobody else can claim it)

GitHub > your profile Settings > Pages > Add a domain > `brightsuite.app`. GitHub shows a TXT record. Add it at the registrar:

| Type | Name | Value |
|---|---|---|
| TXT | `_github-pages-challenge-JordanAlbayrak` | the code GitHub shows |

Then press Verify (DNS can take a few minutes to hours).

## 3. DNS records at <REGISTRAR>

| Type | Name | Value |
|---|---|---|
| A | `@` | 185.199.108.153 |
| A | `@` | 185.199.109.153 |
| A | `@` | 185.199.110.153 |
| A | `@` | 185.199.111.153 |
| AAAA | `@` | 2606:50c0:8000::153 |
| AAAA | `@` | 2606:50c0:8001::153 |
| AAAA | `@` | 2606:50c0:8002::153 |
| AAAA | `@` | 2606:50c0:8003::153 |
| CNAME | `www` | `jordanalbayrak.github.io` |

Remove any parking or forwarding records the registrar added for `@` and `www`. If it has CAA records, add one allowing `letsencrypt.org`.

## 4. Turn on Pages

Repo > Settings > Pages: Source "Deploy from a branch", branch `main`, folder `/docs`. Custom domain: `brightsuite.app` (already in `docs/CNAME`). When the certificate is ready, tick "Enforce HTTPS".

`.app` is HTTPS-only in every browser, so the site shows an error until the certificate is issued (usually within an hour of DNS resolving).

## 5. Check

- `https://brightsuite.app`, `/fr/`, `/pause/privacy/`, `/queue/privacy/` load; `https://www.brightsuite.app` redirects.
- Network tab: every request is to brightsuite.app, no cookies.
- Microsoft Store listing (Partner Center > Store listings, each language): Privacy policy URL `https://brightsuite.app/pause/privacy/` (French: `https://brightsuite.app/fr/pause/privacy/`), Website `https://brightsuite.app/pause/` (opens the BrightPause section). Later Play: `https://brightsuite.app/queue/privacy/`.
- When the Store listing is live, set `STORE_LIVE = true` in `src/pages.mjs`, rebuild, push.
