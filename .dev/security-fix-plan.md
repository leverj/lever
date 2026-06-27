# Security fix plan — lever Project #8 ("lever-security-issues")

Paste the **Prompt** section below into a Claude Code session started in this repo
(`~/layer2/lever`, branch `main` = the 4.x line) to work through the 100 open
dependency-CVE findings on GitHub Project #8.

Context derived from an OSV-verified analysis of all 100 findings + cross-reference
against gallery's already-deployed `resolutions` block (gallery is the downstream
consumer of `@leverj/lever.*` and does contract deployment).

---

## Prompt

You are working in the leverj/lever repo (branch main, the 4.x line). Goal: fix the
100 open dependency-CVE findings on GitHub Project #8 ("lever-security-issues").

HARD CONSTRAINT: lever publishes @leverj/lever.* packages consumed downstream by
gallery (which does contract deployment). Every change MUST keep gallery fixable —
so MIRROR the versions gallery already builds/deploys with. Read gallery's proven
resolutions first: `gh api repos/leverj/gallery/contents/package.json --jq .content
| base64 -d | jq .resolutions` — gallery is the reference; match its pins.

STRATEGY: lever's root `resolutions` are local-only (not published), so the bulk
transitive fixes are lever-repo hygiene with zero gallery impact. Only the direct
convict/immutable range bumps reach gallery, and gallery already pins convict 6.2.5.
For packages where multiple majors coexist in lever's tree (minimatch, ws, glob,
yaml, brace-expansion, diff, immutable, js-yaml, tar), DESCRIPTOR-SCOPE the
resolution (copy gallery's scoping style) so you don't downgrade newer copies.

EXECUTE IN ORDER, test-gated, and use codex (`codex --sandbox read-only`) as an
independent verifier before each PR. Do NOT auto-merge; open PRs for my review.
Never pass --no-dry-run / --no-verify / --force.

GROUP 1 — close as already-fixed (verify each is absent/patched in current yarn.lock
first, then `gh issue close`):
  axios@1.10.0: #27 #50 #57 #65 #87 #168 (tree is on 1.18.1)
  form-data #126 (tree is on 4.0.4+)

GROUP 2 — ONE test-gated PR, gallery-proven targets (~75 findings incl 5 criticals):
  Direct bumps: convict ^6.2.4->^6.2.5 (packages/config; #59 #134 crit);
                immutable direct deps ^5.1.3->^5.1.5 (chain-deployment, chain-tracking,
                common, storage)
  Resolutions (use gallery's exact versions/scoping): handlebars 4.7.9 (#23 #24 #36 #56
  #98 #115 #203 #204), elliptic 6.6.1 (#52 #64 #113 #122 #125 #186 — NOT #101),
  immutable hardhat->4.3.8 (#198), minimatch 10.2.3, lodash 4.18.1, ws 7.5.10/8.20.1,
  validator 13.15.35, picomatch 2.3.2/4.0.4, fast-uri 3.1.2, form-data 4.0.6 (#138),
  socket.io-parser 4.2.6, joi 17.13.4, postcss 8.5.15, follow-redirects 1.16.0,
  diff 5.2.2, brace-expansion 1.1.13/2.0.3, @isaacs/brace-expansion 5.0.1, ajv 8.20.0,
  bn.js 4.12.3, glob 10.5.0, yaml 1.10.3, tmp 0.2.7, cookie 0.7.2,
  undici 6.26.0, tar 7.5.16, uuid 11.1.1, serialize-javascript 7.0.5,
  js-yaml 3.14.2 (patch in 3.x — no major needed), ip-address 10.1.1.
  After editing: `yarn install`, run the full test suite, AND verify hardhat still
  compiles/the deploy path is intact. Close each fixed issue when the PR lands.

GROUP 3 — needs my decision, do NOT auto-fix (no gallery precedent, touches the
build/deploy toolchain): axios@0.21.4 x21 (#32 #37 #53 #73 #78 #82 #103 #127 #135
#140 #144 #145 #151 #154 #159 #162 #182 #194 #197 #200 #205 — all from hardhat-deploy,
deploy-time only); @sigstore/core #143. Summarize options and pause for me.

KEEP OPEN: elliptic #101 (CVE-2025-14505 — no upstream fix); #210 (SAST child-process-
shell — needs a code fix, not a dep bump).

Start with Group 1, then build the Group 2 PR. Show me the resolutions diff and the
codex verdict before pushing.

---

## Notes

- Group 2 target versions are pulled straight from gallery's live `resolutions`, so
  they're battle-tested; the prompt still re-reads gallery + tests in case it moved.
- Optional: you may use `/leverj:triage` for the mechanics, but keep the
  gallery-mirror strategy and the Group boundaries above.
- Tally: Group 1 = 7 closes, Group 2 ~= 75 fixes (incl 5 of 6 criticals),
  Group 3 = 23 needs-decision, keep-open = 2. (Counts approximate; reconcile against
  the live board.)
