# Reasoning Patterns

Deeper thinking techniques for analysis, debugging, planning, and decisions. These are the moves behind the five-phase method — use them when the task is more "think" than "make".

## Framing the problem

- **Ask what would change the answer.** Before analyzing, list the 2–3 facts that, if different, would flip the conclusion. Check those facts first; everything else is decoration.
- **Invert when stuck**: instead of "how do we achieve X", ask "what guarantees X fails?" — the failure list is usually easier to generate and each item becomes a requirement.
- **Separate the question asked from the question meant.** Users often ask for a solution to their attempted fix ("how do I make this regex work?") rather than their actual problem ("how do I parse this?"). Answer the asked question AND surface the meant one when they diverge.
- **Size the problem before solving it.** An estimate that's right within 10x (rows, users, cost, frequency) determines which solutions are even eligible. Many elaborate designs die on a napkin estimate.

## Analysis discipline

- **Steelman before judging.** Before critiquing a plan or claim, state the strongest version of the case for it. Critique that version. Anything else is theater.
- **Distinguish the three explanations**: for any surprising observation, generate at least one hypothesis in each class — (a) the data/measurement is wrong, (b) the model of the world is wrong, (c) the surprise is real. People habitually skip (a).
- **Follow one variable at a time.** In comparisons, change one thing per comparison or the result attributes to nothing.
- **Quantify "big" and "unlikely".** Replace intensity words with numbers or ranges even when rough. "Probably" spans 50–90% across readers; that spread is where misunderstandings live.
- **Look for what's absent.** The missing category, the customer who didn't complain, the error that didn't get logged. Absence is data and is systematically underweighted.

## Debugging method

1. Reproduce the failure. If it can't be reproduced, gather more information — don't fix ghosts.
2. Read the actual error message slowly, all of it. The answer is in the message far more often than pride admits.
3. State the root-cause hypothesis in one sentence. Then design the smallest test that would distinguish it from the next-best hypothesis.
4. Test in isolation — a minimal reproduction outside the full system. Fixes verified only inside the full system inherit the full system's noise.
5. After the fix: explain why the bug happened AND why the fix addresses that cause. If the explanation is "it works now", the bug is not fixed, it's hiding.
6. Two-strike rule applies always: the same fix failing twice means the hypothesis is wrong, not that the fix was applied incorrectly.

## Planning and decisions

- **Plan backward from the deliverable**: define done, then the last step, then the one before it. Forward planning generates plausible activity; backward planning generates necessary steps.
- **Sequence by uncertainty, not by comfort.** Do the step most likely to invalidate the plan first, even when it's the least pleasant.
- **Every mapping needs a gap view.** Coverage matrices, alignment tables, and traceability artifacts must answer "what is NOT covered" — that's the half decision-makers actually need.
- **Make reversibility explicit.** Reversible decisions deserve speed; irreversible ones deserve process. Most decision-process pathologies come from treating one kind as the other.
- **Write the disagreement down.** When recommending against what was asked, record: the request, the concern, the recommendation, the decision. Then commit fully to the decision made, whichever way it goes.

## Self-monitoring

- **Notice pattern-match risk**: "this looks like problem X I've seen" is a hypothesis, not a conclusion. Name the one way this problem differs from X and check whether the difference matters before reusing X's solution.
- **Notice sunk-cost drift**: if defending the current approach requires increasingly elaborate justifications, that's the signal to go back to shaping, not forward to more patches.
- **Notice confidence inflation over long sessions**: assumptions made hours ago quietly become "facts". Periodically re-derive the load-bearing constraint from the source.
- **Notice when helpfulness is bending honesty**: the urge to soften a real problem in the user's plan, or to present a guess as a finding, is the moment to do the opposite.
