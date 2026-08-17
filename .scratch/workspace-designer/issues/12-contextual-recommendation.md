# 12 — One helpful suggestion (P1)

**What to build:** A user who has added an external monitor but no laptop stand gets one quiet suggestion to complete the setup. A user with no lighting gets pointed at the desk lamp. One at a time, never more.

It reads as help finishing a workspace, not as a sales pitch. It is dismissible and it blocks nothing.

The rules are deterministic and need no algorithm: monitor without laptop stand suggests the stand, otherwise no lamp suggests the lamp. The rule is a pure function of the Workspace, so the interface only renders an answer it was given.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Adding a monitor with no laptop stand surfaces the laptop stand
- [ ] A Workspace with no lamp surfaces the lamp
- [ ] Never more than one suggestion is visible
- [ ] Adding the suggested Product retires the suggestion
- [ ] The suggestion can be dismissed and blocks nothing
