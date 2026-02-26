# Be Sovereign

**Own Your Digital Life**

A declaration of digital independence. Sign on-chain, permanently and uncensorably.

🌐 **Live:** [besovereign.xyz](https://besovereign.xyz)

## About

We gave our data to big tech. Our photos, our messages, our memories — stored on their servers, governed by their terms, deleted at their will. No more. We choose sovereignty.

### The Five Principles

1. **Data Ownership** — Your data is your property
2. **Self-Custody** — Hold your own keys
3. **Portability** — Your identity moves with you
4. **Interoperability** — Systems should speak to each other
5. **Privacy by Default** — Surveillance requires consent

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animations:** GSAP
- **Hosting:** Vercel
- **On-chain Storage:** Arkiv (Golem Foundation)

## Infrastructure

### Domains

| Domain | DNS | Points To | Purpose |
|--------|-----|-----------|---------|
| besovereign.xyz | Cloudflare | Vercel | Main site |
| robertmillerconsultancy.com | Wix (locked) | redirect.pizza | Legacy redirect |

### Redirect Setup (robertmillerconsultancy.com)

Since the legacy domain is stuck at Wix (registrar won't transfer), we use **redirect.pizza** to handle 301 redirects:

- **Service:** [redirect.pizza](https://redirect.pizza) (free)
- **DNS Records (set in Wix):**
  - A record: `89.106.200.1`
  - CNAME www: `edge.redirect.pizza`
- **Destination:** https://robertmiller.xyz

### Environment Variables

Required for deployment:
- `ARKIV_PRIVATE_KEY` — Private key for on-chain attestations (set in Vercel)

## Development

```bash
npm install
npm run dev
```

## Credits

Built by [Robert Miller](https://robertmiller.xyz) at Network School.

Powered by [Arkiv](https://arkiv.network) and [Golem Network](https://golem.network).
