---
name: scientific-thinking
description: World-class scientific methodology across all disciplines — hypothesis formation, experimental design, falsification, measurement rigor, first-principles physics/chemistry/biology reasoning, and systematic debugging. Use when debugging hard problems, evaluating claims or evidence, designing experiments, or reasoning about physical/biological/chemical systems.
---

# Scientific Thinking

สรุปย่อ: วิทยาศาสตร์ไม่ใช่ชุดความรู้ แต่เป็นวินัยในการพยายามพิสูจน์ว่าตัวเอง*ผิด*ให้เร็วที่สุด

## The universal method

1. **Observe precisely.** Record what actually happened, separated from interpretation. "หน้า admin ช้า" is interpretation; "คลิกเมนูแล้วไม่มีอะไรเปลี่ยน 1.8 วินาที" is observation.
2. **Hypothesize mechanistically.** A good hypothesis names a mechanism and forbids something: "ช้าเพราะ auth round-trip 2 ครั้ง" predicts that removing one halves the delay.
3. **Predict before testing.** Write the expected result down first — post-hoc explanation fits anything.
4. **Change one variable.** Two simultaneous changes = zero conclusions.
5. **Try to falsify, not confirm.** Design the test most likely to break your favorite explanation.
6. **Quantify uncertainty.** Every measurement has noise; measure twice before trusting a difference once.

## Discipline lenses (borrow the right one)

- **Physics — conservation & limits:** what quantity is conserved? what bounds the system (bandwidth, latency, throughput)? Estimate orders of magnitude (Fermi) before building.
- **Chemistry — rates & equilibria:** systems settle into balance; changing one concentration shifts everything coupled to it. Ask what the rate-limiting step is — speeding anything else is wasted.
- **Biology — evolution & ecosystems:** anything that persists is being selected for by some pressure. Bad process survives because it pays someone; find the incentive before removing the behavior.
- **Mathematics — invariants & proof:** what stays true through every step? An invariant that breaks locates the bug. Edge cases (0, 1, boundary, overflow) are where induction fails.
- **Engineering — margins & failure modes:** design for the load you'll see × safety factor; ask "how does this fail?" before "how does this work?"

## Systematic debugging (science applied to code)

Reproduce → minimize (smallest failing case) → bisect (space or history) → single-variable fix → verify the fix *and* that nothing else moved. A bug fixed without a mechanism understood will return wearing a different coat.

## Evaluating claims (yours or others')

- What evidence would change this conclusion? If none exists, it's belief, not knowledge.
- Correlation, base rates, survivorship: the three horsemen of wrong conclusions.
- Extraordinary claims (10× improvement, "it just works now") require re-measurement.

## Cross-discipline links

- With **data-science**: statistics is the microscope; this skill is knowing where to point it.
- With **backend-architecture**: capacity planning is Fermi estimation with a billing account.
- With **creative-direction**: science prunes what's false; art chooses among the many things that are true.
