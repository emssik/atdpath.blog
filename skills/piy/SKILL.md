---
name: piy
description: "Generate a PIY (Prompt It Yourself) project page for the atdpath blog. Runs from any repository — analyzes the project and creates a markdown file in the PIY section of the blog. Also ensures the source repo meets all deploy requirements: license, blog link, and README quote. Use when: user wants to add a project to PIY, generate a PIY description, create a PIY entry, or says 'add to piy', 'piy', 'create piy page'. Triggers: 'piy', 'add to piy', 'new piy project', 'generate piy'."
---

# PIY — Prompt It Yourself

Skill that generates a PIY project page for the atdpath blog AND ensures the source repo passes all deploy-time validation checks.

## Target paths

Blog repo: `/Users/daniel/00_work/projects/active/page.blog.atdpath`
PIY content files: `src/content/piy/<slug>.md`
Validation script: `.dev/check-projects.sh`

## Workflow

### Phase 1: Analyze the project

1. Read README.md, package.json (or equivalent manifest), browse directory structure and source code of the **current repository**
2. Determine the slug — short, unique project name in kebab-case
3. Get the repo URL from git config: `git remote get-url origin` → convert to HTTPS format

### Phase 2: Generate the PIY markdown file

Create `src/content/piy/<slug>.md` in the blog repo with the format below.

### Phase 3: Ensure deploy checks will pass

The blog's `build.sh` runs `.dev/check-projects.sh` before every deploy. It verifies three things for each PIY project. The skill MUST ensure all three are satisfied:

#### Check 1: License

The source repo MUST have a license recognized by GitHub. Use **Commons Clause + MIT** — the same license used across all PIY projects.

If the repo lacks a LICENSE file, **create one** with this exact content (replacing `<software-name>` and adjusting the year):

```
Commons Clause License Condition v1.0

The Software is provided to you by the Licensor under the License,
as defined below, subject to the following condition.

Without limiting other conditions in the License, the grant of rights
under the License will not include, and the License does not grant to
you, the right to Sell the Software.

For purposes of the foregoing, "Sell" means practicing any or all of
the rights granted to you under the License to provide to third parties,
for a fee or other consideration (including without limitation fees for
hosting or consulting/support services related to the Software), a
product or service whose value derives, entirely or substantially, from
the functionality of the Software. Any license notice or attribution
required by the License must also include this Commons Clause License
Condition notice.

Software: <software-name>
License: MIT License
Licensor: Daniel Roziecki

---

MIT License

Copyright (c) 2025-2026 Daniel Roziecki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

#### Check 2: Blog link in repo

The GitHub repo must have a link to `blog.atdpath.com` in either:
- The **homepage** field, OR
- The **description** field

Set the homepage to: `https://blog.atdpath.com/piy/<slug>`

Use: `gh repo edit --homepage "https://blog.atdpath.com/piy/<slug>"`

#### Check 3: README starts with PIY quote

The repo's README.md must begin with this exact blockquote as the **very first content after the title** (first line can be the project title as `# Title`):

```
> This project is published as part of [PIY — Prompt It Yourself](https://blog.atdpath.com/piy), a personal initiative launched on March 8, 2026, encouraging others to build their own apps with the help of LLMs.
```

If the README doesn't contain this quote, **add it** right after the `# Title` line (or at the very beginning if there's no title). Do NOT remove existing README content — just prepend the quote.

### Phase 4: Confirm

Display a summary:
- Path to the generated PIY markdown file
- Status of each check (license ✓/✗, blog link ✓/✗, README quote ✓/✗)
- Any actions taken (files created/modified)
- Reminder to commit changes in both repos if needed

## PIY markdown format

```markdown
---
title: "Project Name"
description: "Concise description in 1-2 sentences, in Polish"
pubDatetime: YYYY-MM-DD
repo: "https://github.com/user/repo"
tags:
  - tag1
  - tag2
difficulty: beginner|intermediate|advanced
---

## O projekcie

General project description — what it is, what it does, how it was created.
Written in polished Polish, avoiding unnecessary anglicisms.
Replace English terms with Polish equivalents where natural
(e.g. "tablica rozdzielcza" instead of "dashboard", "repozytorium" is OK).

The version is tailored for and used daily on macOS.

## Podstawowa funkcjonalność

- Feature 1
- Feature 2
- ...

## Uruchomienie i testowanie

Step-by-step instructions to run the project locally.
Dependencies to install, commands to execute.

## Rozbudowa na własną rękę

Potential directions for extending the project — ideas for additions,
changes, improvements. Encouragement for independent experimentation.

## Licencja

Projekt udostępniony na licencji MIT z klauzulą [Commons Clause](https://commonsclause.com/). Możesz swobodnie czytać kod, uczyć się z niego, forkować i modyfikować na własne potrzeby — także w firmie. Jedyne ograniczenie: nie możesz sprzedawać tej aplikacji jako własnego produktu ani oferować jej jako płatnej usługi.
```

## Content rules

- Write in polished Polish prose, avoid unnecessary anglicisms
- Keep technical terms (tool names, commands, language names) in their original form
- Always mention that the version is tailored for and used daily on macOS
- Always include the "Licencja" section with the Commons Clause + MIT description (exact text as in the template above)
- Assess difficulty based on project complexity:
  - `beginner` — simple project, few files, basic technologies
  - `intermediate` — more dependencies, APIs, more complex logic
  - `advanced` — complex architecture, many integrations, advanced patterns
- Choose tags from technology/language names used in the project (lowercase)
- Set `pubDatetime` to today's date
- Get `repo` from git config (`git remote get-url origin`) and convert to HTTPS URL
- "Rozbudowa na własną rękę" section should contain specific, realistic expansion ideas tailored to the project
- Tone: friendly, encouraging, factual — no excessive enthusiasm
