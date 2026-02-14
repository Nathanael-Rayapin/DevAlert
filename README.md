# API Health Monitor - 🚧 Under construction 🚧

> Monitor the health status of your favorite APIs with a beautiful CLI interface

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎯 **35+ APIs** pre-configured (GitHub, npm, Discord, MongoDB, Cloudflare, etc.)
- 📦 **Easy setup** with interactive CLI (checkbox selection with spacebar)
- ⚙️ **Customizable** monitoring intervals (30s to 30min)
- 🌍 **Timezone support** for accurate scheduling
- 🎨 **Beautiful terminal UI** with colors and icons
- 💾 **Persistent configuration** saved in your home directory
- 📊 **Real-time status** with detailed error reporting
- 🔄 **Reconfigurable** anytime with `api-monitor init`

## 📦 Installation

### Global installation (recommended)

```bash
npm install -g api-health-monitor
```

### Local installation

```bash
npm install api-health-monitor
npx api-monitor init
```

## 🚀 Quick Start

### 1. Initialize configuration

```bash
api-monitor init
```

You'll see an interactive setup:

```
╔═══════════════════════════════════════════╗
║                                           ║
║     🏥 API HEALTH MONITOR                 ║
║     Monitor your favorite APIs            ║
║                                           ║
╚═══════════════════════════════════════════╝

🔧 Configuration de votre monitoring

? Configuration rapide:
❯ ✅ Toutes les APIs disponibles
  🎯 Sélection personnalisée
  ❌ Annuler
```

Select APIs with **Spacebar**, validate with **Enter**.

### 2. Start monitoring

```bash
api-monitor start
```

Output example:

```
🚀 Démarrage du monitoring...

APIs surveillées: 12
Intervalle: 60s
Fuseau horaire: Europe/Paris
──────────────────────────────────────────────

🏥 Healthcheck - 2026-02-11T15:29:00.000Z
🟢 GitHub: All Systems Operational (245ms) [none]
🟢 npm: All Systems Operational (189ms) [none]
🟡 Discord: Partial System Outage (312ms) [minor]
🟢 Cloudflare: All Systems Operational (156ms) [none]
✅ Healthcheck terminé
```

### 3. Reconfigure anytime

```bash
api-monitor init  # Modify your selection
```

## 📚 Commands

### `api-monitor init`

Initialize or reconfigure your monitoring setup.

**What it does:**
- Guides you through API selection (checkbox with spacebar)
- Lets you choose monitoring interval (30s, 1min, 5min, 15min, 30min)
- Configures timezone
- Saves configuration to `~/.api-health-monitor/config.json`

### `api-monitor start`

Start the health monitoring based on your configuration.

**Options:**
- `-d, --daemon` - Run as background process (experimental)

**Exit:** Press `Ctrl+C` to stop gracefully.

### `api-monitor status`

Display your current configuration:

```bash
📊 Configuration actuelle

Fichier: /home/user/.api-health-monitor/config.json
APIs: 12 sélectionnées
  • GitHub (Developer Tools)
  • npm (Developer Tools)
  • Discord (Communication)
  ...

Intervalle: 60s
Fuseau horaire: Europe/Paris
Créée le: 11/02/2026 14:30:00
Modifiée le: 11/02/2026 15:15:00
```

### `api-monitor list`

List all available APIs to monitor:

```bash
api-monitor list                    # All APIs grouped by category
api-monitor list -c "Databases"     # Filter by category
```

### `api-monitor reset`

Delete your current configuration:

```bash
api-monitor reset
```

## 🎯 Available APIs

The tool includes **35+ pre-configured APIs** across multiple categories:

### ☁️ Cloud Infrastructure
- Vercel, Netlify, Render
- DigitalOcean, Linode
- Cloudflare

### 🛠️ Developer Tools
- GitHub, npm
- Atlassian (Jira, Confluence, Bitbucket)
- Datadog, Sentry, Elastic

### 💾 Databases
- MongoDB Cloud, Redis
- PlanetScale, Supabase

### 💬 Communication
- Discord, Zoom, Twitch
- Twilio, Intercom

### 🛒 E-commerce
- Shopify

### 📁 Productivity
- Dropbox, Notion

### 📊 Analytics
- Segment

### 📧 Email Services
- SendGrid, Mailgun

**All APIs use the Statuspage.io standard** (`/api/v2/status.json`)

## 🔧 Configuration

Your configuration is stored at:
```
~/.api-health-monitor/config.json
```

Example configuration:

```json
{
  "selectedApis": [
    "github",
    "npm",
    "discord"
  ],
  "checkInterval": 60,
  "timezone": "Europe/Paris",
  "createdAt": "2026-02-11T14:30:00.000Z",
  "updatedAt": "2026-02-11T15:15:00.000Z"
}
```

### Intervals

Available intervals:
- `30` - 30 seconds
- `60` - 1 minute (recommended) ⭐
- `300` - 5 minutes
- `900` - 15 minutes
- `1800` - 30 minutes

### Timezones

Supported timezones:
- `Europe/Paris` (🇫🇷)
- `Europe/London` (🇬🇧)
- `America/New_York` (🇺🇸)
- `America/Los_Angeles` (🇺🇸)
- `Asia/Tokyo` (🇯🇵)
- `UTC` (🌍)

## 🧑‍💻 Programmatic Usage

You can also use this package programmatically in your Node.js projects:

```typescript
import { 
    startHealthcheckScheduler, 
    stopHealthcheckScheduler,
    getApisByIds 
} from '@ton-username/api-health-monitor';

// Select APIs to monitor
const selectedApis = getApisByIds(['github', 'npm', 'discord']);

// Start monitoring
const job = startHealthcheckScheduler(selectedApis, {
    interval: 60,
    timezone: 'Europe/Paris'
});

// Stop monitoring later
setTimeout(() => {
    stopHealthcheckScheduler(job);
}, 60000);
```

### TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
    ApiConfig, 
    IHealthcheckResult, 
    UserConfig 
} from '@ton-username/api-health-monitor';
```

## 🏗️ Architecture

```
src/
├── cron/
│   ├── healthcheck.ts        # HTTP health checks
│   └── scheduler.ts          # Cron job scheduler
├── data/
│   ├── apis-to-monitor.ts    # 35+ pre-configured APIs
│   ├── status-mapping.ts     # Status indicator mapping
│   └── http-error-mapping.ts # HTTP error handling
├── interfaces/
│   ├── healthcheck.ts        # TypeScript interfaces
│   ├── http-error-status.ts
│   └── status-json.ts
├── utils/
│   ├── icons.ts              # Terminal icons
│   ├── map-http-status.ts    # HTTP status mapper
│   └── type-guards.ts        # TypeScript type guards
├── cli/
│   ├── commands.ts           # CLI commands
│   ├── init.ts               # Init logic
│   └── prompts.ts            # Interactive prompts
├── config/
│   └── user-config.ts        # Configuration persistence
└── index.ts                  # Public exports
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add more APIs**: Submit a PR with new Statuspage.io endpoints
2. **Improve UI**: Enhance the CLI experience
3. **Fix bugs**: Report issues or submit fixes

## 📝 License

MIT © Nathanaël Rayapin

## ⚠️ Disclaimer

This tool relies on Atlassian's Statuspage.io public API endpoints. The availability and format of these endpoints are controlled by Atlassian. While these APIs are publicly accessible, they may change without notice.

## 🙏 Credits

- Built with [croner](https://github.com/Hexagon/croner) for scheduling
- CLI powered by [inquirer](https://github.com/SBoudrias/Inquirer.js) and [commander](https://github.com/tj/commander.js)
- Styled with [chalk](https://github.com/chalk/chalk)
- APIs monitored through [Statuspage.io](https://www.atlassian.com/software/statuspage)

---

**Made with ❤️ by Nathanaël Rayapin**
