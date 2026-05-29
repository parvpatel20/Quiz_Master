# Sample Data & Test Credentials

This project ships with a seed script that fills the database with sample
quizzes, users, quiz history, and bookmarks so **every feature is testable**.

## Run the seed

```bash
cd backend
# make sure .env is configured (MONGODB_URI etc.) — see .env.example
npm run seed
```

The seed is **additive and idempotent** — it never deletes anything. Sample
quizzes are matched by name and sample users by username/email; anything that
already exists is skipped. Safe to run against a populated database and safe to
re-run.

After it finishes you'll see a summary of how many quizzes/users were added or
skipped.

---

## Sample login credentials

**Every account uses the same password:**

```
Password: Test@123
```

| Username | Class               | What it's good for testing                                   |
| -------- | ------------------- | ------------------------------------------------------------ |
| `demo`   | Class 10            | **Main account.** Rich quiz history (8 attempts incl. a 3-day streak), 2 bookmarks → full Dashboard charts, Profile stats, Bookmarks page. |
| `aarav`  | Class 10            | High accuracy — sits near the top of the Class 10 leaderboard. |
| `diya`   | Class 10            | Mid-range scores for leaderboard ranking.                    |
| `kabir`  | Class 10            | Lower scores — bottom of Class 10 leaderboard.               |
| `meera`  | Class 12 (Science)  | Different class — test leaderboard class filter.             |
| `rohan`  | Class 8             | Another class for filtering.                                 |
| `newbie` | Class 9             | **No history** — test empty Dashboard/Profile states.        |

Log in at `/login` with any username above + `Test@123`.

---

## What you can test with each feature

- **Discovery (`/quiz-search`)** — search by name/topic, filter by subject
  chips, difficulty, and format; sort; bookmark quizzes. 10 quizzes span
  Mathematics, Science, English, Physics, General Knowledge, and Computer
  Science across easy/medium/hard.
- **Quiz play + Answer review** — quizzes cover **all 4 formats**:
  - MCQ (Single): _Algebra Basics_, _English Tenses_, _Laws of Motion_, _Programming Basics_, _Fractions Made Easy_
  - MCQ (Multiple): _States of Matter_, _Quantum Mechanics Intro_
  - True/False: _The Human Body_, _World Facts_
  - Fill-in-the-Blank: _Parts of Speech_
  Take any quiz, submit, then **Review answers** to verify correct-vs-yours.
- **Dashboard (`/dashboard`)** — log in as `demo` to see score-over-time and
  top-subjects charts, day-streak, stats, recent activity, and recommendations.
  Log in as `newbie` to see the empty state.
- **Bookmarks (`/bookmarks`)** — `demo` has _Laws of Motion_ and
  _Programming Basics_ pre-bookmarked; toggle bookmarks from any quiz card.
- **Leaderboard (`/leaderboard`)** — select **Class 10** to see `aarav`,
  `diya`, `kabir`, `demo` ranked by accuracy (with a top-3 podium). Switch to
  other classes to test the filter; use the search box to find a user.
- **Profile (`/profile`)** — edit username/email/class/bio/password/picture;
  view stats and full quiz history.

---

## Re-seeding

`npm run seed` can be run repeatedly — existing sample quizzes/users are
detected and skipped, and no data is ever deleted.

> Note: the script loads a small compatibility shim (`src/preload.mjs`) via
> `node --import` so it runs on newer Node versions (24+) where the legacy
> `SlowBuffer` API used by an old `jsonwebtoken` dependency was removed.
