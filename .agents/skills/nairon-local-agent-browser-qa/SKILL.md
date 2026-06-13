---
name: nairon-local-agent-browser-qa
description: Use when testing the Nairon website locally with the agent-browser CLI, especially careers applications and admin review flows.
---

# Nairon Local Agent Browser QA

Use this skill to run the Nairon website locally, exercise it with `agent-browser`, and leave reproducible evidence in `.context/qa-runs`.

## Boot Checklist

1. Work from the repo root.

```bash
cd /Users/obaid/conductor/workspaces/nairon-website/louisville-v2
export PATH="/Users/obaid/.bun/bin:$PATH"
```

2. Make a QA evidence directory.

```bash
QA_DIR=".context/qa-runs/$(date +%Y%m%d-%H%M%S)-local-agent-browser"
mkdir -p "$QA_DIR"
printf "%s\n" "$QA_DIR" > .context/latest-qa-dir
```

3. Ensure local env exists.

For careers admin tests, `CAREERS_ADMIN_TOKEN` must be available in the web server process. The ignored `.context/CAREERS_ADMIN_TOKEN.txt` file is the local source of truth when present.

```bash
TOKEN="$(cat .context/CAREERS_ADMIN_TOKEN.txt)"
export CAREERS_ADMIN_TOKEN="$TOKEN"
```

The web app reads Convex URLs from the repo root `.env.local` and syncs them into `apps/web/.env.local` before Vite starts. If the files are missing, pull Vercel env first or start Convex using the repo instructions.

4. Start the web app.

```bash
PORT=3001 VITE_DISABLE_REACT_GRAB=true CAREERS_ADMIN_TOKEN="$CAREERS_ADMIN_TOKEN" bun run dev:web
```

Use `lsof -ti tcp:3001 | xargs -r kill` if a stale server is already using the port.

Do not rely on `bun run dev:server` in a fresh workspace unless Convex is already configured; Convex may prompt interactively. For noninteractive QA, use the configured Convex deployment URL from local env and state that the local web app is backed by that deployment.

## Agent Browser Setup

Load the built-in CLI guidance when needed:

```bash
agent-browser skills get core --full
```

Use isolated sessions and save artifacts under `QA_DIR`:

```bash
export AGENT_BROWSER_SESSION_NAME=nairon-local-qa
agent-browser open http://localhost:3001/careers/founding-engineer
agent-browser snapshot -i > "$QA_DIR/careers-snapshot.txt"
agent-browser screenshot "$QA_DIR/careers.png"
```

## Careers Application Test

1. Open the role page.

```bash
agent-browser open http://localhost:3001/careers/founding-engineer
```

2. Verify URL fields accept bare domains. They should be `type="text"` with `inputMode="url"`.

```bash
agent-browser eval "JSON.stringify(Array.from(document.querySelectorAll('#apply input[inputmode=url]')).map(el => ({ name: el.name, type: el.type, inputMode: el.inputMode, valid: el.checkValidity() })), null, 2)" > "$QA_DIR/url-inputs.json"
```

3. Fill the form with a browser eval helper when the CLI `fill` command does not mutate every controlled React input. This page can be affected by smooth scrolling and overlay tooling in local dev.

```bash
EMAIL="agent.browser+$(date +%s)@example.com"
printf "%s\n" "$EMAIL" > "$QA_DIR/application-email.txt"
agent-browser eval "const values={name:'Agent Browser QA',email:'$EMAIL',phone:'+971501234567',portfolio:'github.com/naironai/local-qa',traces:'traces.com/share/local-agent-browser-qa',aiStack:'Codex, agent-browser CLI, Convex, TanStack Start.',projects:'Built local automated QA for Nairon careers.',note:'Testing the application flow.'}; const setValue=(el,value)=>{ const proto=el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto,'value').set.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }; const form=document.querySelector('#apply form'); for (const [name,value] of Object.entries(values)) setValue(form.querySelector('[name='+CSS.escape(name)+']'), value); JSON.stringify({valid:form.checkValidity(), formData:Object.fromEntries(new FormData(form).entries())}, null, 2)" > "$QA_DIR/application-before-submit.json"
```

4. Submit and verify persistence.

The browser UI should be checked, but the authoritative local E2E assertion is that the application is saved and can be read through the admin API.

```bash
agent-browser eval "document.querySelector('#apply form').requestSubmit(); 'submitted'"
sleep 5
agent-browser snapshot -i > "$QA_DIR/application-after-submit.txt"
```

5. Verify the candidate through the local admin API.

```bash
bun -e 'const email=process.argv[1]; const token=process.argv[2]; const res=await fetch("http://localhost:3001/api/career-applications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminEmail:"obaid@naironai.com",adminToken:token})}); const json=await res.json(); const found=json.applications?.find(a=>a.email===email); console.log(JSON.stringify({status:res.status, found: found && {name:found.name,email:found.email,portfolioUrl:found.portfolioUrl,roleTitle:found.roleTitle,applicationFieldsJson:found.applicationFieldsJson}}, null, 2));' "$EMAIL" "$CAREERS_ADMIN_TOKEN" > "$QA_DIR/admin-api-verify.json"
```

Expected:

- `status` is `200`.
- `found.email` equals the submitted email.
- Bare URLs are normalized to `https://...`.
- `applicationFieldsJson` includes every role-specific answer.

## Careers Admin Panel Test

1. Positive admin:

```bash
agent-browser open http://localhost:3001/admin/careers
agent-browser eval "const token='$CAREERS_ADMIN_TOKEN'; const setValue=(el,value)=>{ const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }; const form=document.querySelector('form'); setValue(form.querySelector('input[name=adminEmail]'),'obaid@naironai.com'); setValue(form.querySelector('input[name=adminToken]'),token); form.requestSubmit(); 'submitted';"
sleep 4
agent-browser eval "document.body.innerText" > "$QA_DIR/admin-positive.txt"
agent-browser screenshot "$QA_DIR/admin-positive.png"
```

2. Negative admin:

```bash
agent-browser open http://localhost:3001/admin/careers
agent-browser eval "const token='$CAREERS_ADMIN_TOKEN'; const setValue=(el,value)=>{ const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }; const form=document.querySelector('form'); setValue(form.querySelector('input[name=adminEmail]'),'bad@example.com'); setValue(form.querySelector('input[name=adminToken]'),token); form.requestSubmit(); 'submitted';"
sleep 2
agent-browser eval "document.body.innerText" > "$QA_DIR/admin-negative.txt"
```

Expected negative text includes `This email is not authorized for careers admin`.

## Quality Gates

Before finishing code changes:

```bash
bun run check-types
bun run build
```

If `apps/web/public/sitemap.xml` changes only because the build refreshed `<lastmod>`, restore the unrelated date churn before committing.

## Report

Include:

- Local URL used.
- Convex deployment URL used.
- QA evidence directory.
- Submitted test email.
- Whether admin positive and negative checks passed.
- Any known local tooling caveats, such as `agent-browser fill` not mutating every controlled input on the careers form.
