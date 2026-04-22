# @vitaltrends/mcp-server

MCP server for [VitalTrends](https://vitaltrends.net) — query your WHOOP, Withings, and Apple Health data from Claude Desktop using natural language.

```
"What was my average HRV last week compared to the week before?"
"On days I ran more than 10 km, how did my recovery score change the next day?"
"Give me a weekly summary of sleep performance for April."
```

## Requirements

- [VitalTrends](https://vitaltrends.net) account with an active subscription
- A VitalTrends API key (generate one in **Settings → Developer**)
- [Claude Desktop](https://claude.ai/download) (Mac or Windows) or another MCP-compatible client
- Node.js 18+

## Setup

### 1. Get your API key

Log in to VitalTrends and go to **Settings → Developer**. Click **Generate API key** and copy it.

### 2. Install the package globally

```bash
npm install -g @vitaltrends/mcp-server
```

### 3. Configure Claude Desktop

Open the Claude Desktop config file:

- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the VitalTrends entry inside `"mcpServers"`:

```json
{
  "mcpServers": {
    "vitaltrends": {
      "command": "mcp-server",
      "env": {
        "VITALTRENDS_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

If Claude Desktop can't find `mcp-server`, replace `"mcp-server"` with the full path from `which mcp-server`.

### 4. Restart Claude Desktop

Quit and reopen Claude Desktop. You should see a VitalTrends icon in the toolbar indicating the server connected.

## Available tools

| Tool | Description |
|---|---|
| `get_whoop_daily` | Recovery score, HRV, resting heart rate, sleep performance, sleep duration, and strain — one row per day |
| `get_whoop_workouts` | Workout history with sport name, duration, strain, heart rate, and distance |
| `get_withings_measurements` | Weight and body composition: weight (kg), fat ratio, fat mass, fat-free mass, and muscle mass |
| `get_apple_health_daily` | Daily Apple Health aggregates: steps, energy (kcal), distance (km), heart rate, HRV, SpO2, and sleep |
| `get_summary` | Cross-source aggregate: avg/min/max recovery, HRV, RHR, sleep performance, strain, workout count, and body composition |

All tools accept optional `start` and `end` date parameters (`YYYY-MM-DD`) and a `per_page` parameter (1–200, default 50).

## Development

```bash
npm install
npm run build   # compile TypeScript to dist/
npm test        # run tests
npm run dev     # watch mode
```

## Publishing

```bash
npm run build
npm publish --access public
```

## Security

- The API key is read from the `VITALTRENDS_API_KEY` environment variable and is never logged or included in error output.
- All requests use HTTPS.
- Tool arguments are validated before being sent to the API (date format, per_page bounds).
- Requests time out after 30 seconds.

## License

MIT
