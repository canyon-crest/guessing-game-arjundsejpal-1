# Above and Beyond

I worked with Claude (AI assistant) to implement the following extra features beyond the 12 autograded requirements.

---

## 1. CSS Styling and Visual Design

**What:** Built a full dark mode UI with a purple accent color scheme, rounded cards, and the Inter font from Google Fonts. Each section (level select, guessing, stats, leaderboard) is organized into styled cards with subtle glowing purple borders.

**Where:** `styles.css` — entire file

**Why:** Makes the game feel like a polished modern app instead of a plain HTML page. Improves readability and user experience significantly.

---

## 2. Win Celebration Animation

**What:** When the player guesses correctly, the `#msg` element pulses purple and scales up briefly as a visual celebration.

**Where:** `styles.css` — `@keyframes winCelebration` and `.win-celebrate` class. `script.js` — `setMsg()` function with the `celebrate` parameter, and the correct guess branch in `makeGuess()`.

**Why:** Gives the player satisfying feedback when they win, making the game more fun and rewarding.

---

## 3. Message Animation

**What:** Every time the `#msg` text changes (new guess, feedback, win, error), it fades in with a slight upward slide animation.

**Where:** `styles.css` — `@keyframes msgPop` and `.msg-animate` class. `script.js` — `setMsg()` helper function which is called everywhere instead of setting `msg.textContent` directly.

**Why:** Makes the game feel alive and responsive. Without it, feedback messages just swap instantly with no visual indication that something changed.

---

## 4. Input Validation (Out of Range)

**What:** If the player types a number outside the valid range for the selected difficulty (e.g. guessing 50 on Easy 1–3), an error message is shown and the guess is not counted.

**Where:** `script.js` — `makeGuess()` function, the `else if (guess < 1 || guess > range)` check.

**Why:** Prevents the player from wasting guesses on impossible numbers and gives clear feedback about the valid range.

---

## 5. Enter Key Support

**What:** The player can press Enter instead of clicking the Guess button to submit their guess.

**Where:** `script.js` — `keydown` event listener on the `#guess` input near the top of the file.

**Why:** Makes the game much faster and more natural to play. Clicking a button every time you want to guess gets tedious quickly.

---

## 6. Default Name Fallback

**What:** If the player cancels the name prompt or enters nothing, the game defaults to "Player" instead of crashing.

**Where:** `script.js` — line 2, `|| 'Player'` in the prompt assignment.

**Why:** Without this the game crashes entirely if the user hits Cancel on the prompt, since you can't call `[0]` on `null`.
