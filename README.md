# Territory Map

An interactive map application for visualizing and managing sales territory assignments. The app displays a world map where countries, US states, and Canadian provinces are color-coded by assigned sales representative.

## 🚀 Quick Start: Deploy Your Own Territory Map

Want to create your own customized territory map? Here's how to get started in minutes:

### 1. **Clone the Repository**

```bash
git clone https://github.com/josephbarringhaus/sales-territory-map.git
cd sales-territory-map
cd apps/territory-map
npm install
```

### 2. **Customize with AI**

**Suggested tools:** [Claude Code](https://claude.ai/code) or [Cursor](https://cursor.sh)

Open the project in your AI coding assistant and use it to customize the map for your needs:

**Example prompts to try:**
```
"Change the rep names from 'Rep 1, Rep 2...' to actual names: Alice, Bob, Carol, etc."

"Add 2 more sales reps (Rep 9 and Rep 10) and assign them territories in Asia"

"Reassign all of South America to Rep 3"

"Change the color scheme to use my company brand colors: #FF6B6B for Rep 1, #4ECDC4 for Rep 2..."

"Add Mexico to Rep 2's territory and log it in the changelog"
```

The AI will help you:
- Modify territory assignments in `src/config/ownership.ts`
- Update rep names and colors in `src/config/reps.ts`
- Add or remove reps as needed
- Automatically update the changelog
- Ensure everything stays in sync

### 3. **Test Locally**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your customized map.

### 4. **Deploy to Vercel (Free)**

My preferred way to deploy is with [Vercel](https://vercel.com):

1. Push your customized code to GitHub:
   ```bash
   git add -A
   git commit -m "Customize territory map for my team"
   git push origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure everything
5. Click **Deploy**

That's it! Your map will be live at a public URL in ~2 minutes. Vercel's free tier includes:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Custom domain support (optional)

### Alternative: Deploy to Other Platforms

This Next.js app can also deploy to:
- **Netlify**: Auto-detects Next.js configuration
- **Railway**: One-click deploy from GitHub
- **DigitalOcean App Platform**: Built-in Next.js support

---

## What It Does

- **World Map View**: Shows all countries color-coded by assigned rep
- **North America Drill-Down**: Click on the US or Canada to see state/province-level assignments
- **Rep Filtering**: Use the rep picker buttons to filter the map to show only specific territories
- **Territory List**: Sidebar displays all territories for the selected rep
- **Interactive Controls**: Zoom, pan, reset, and toggle labels on the map
- **Changelog**: View and filter all territory ownership changes with the Changelog button
- **CSV Export**: Download territory assignments as CSV for analysis

## Project Structure

```
/apps
  /territory-map          # Next.js application
    /app                 # Next.js App Router pages
      layout.tsx         # Root layout with providers
      page.tsx            # Main map page
      not-found.tsx       # 404 page
      globals.css         # Global styles
    /src
      /components         # React components
        WorldMap.tsx     # World map visualization
        NorthAmericaMap.tsx # US/Canada map visualization
        RepPicker.tsx    # Rep selection buttons
        MapControls.tsx  # Zoom/pan/label controls
        TerritoryList.tsx # Sidebar territory list
        Legend.tsx       # Color legend
        ChangelogDialog.tsx # Territory change history dialog
        /ui              # shadcn-ui components
      /config
        ownership.ts     # Territory ownership assignments ⭐
        changelog.json   # Territory change history log ⭐
        reps.ts          # Rep definitions (names, colors)
      /hooks             # Custom React hooks
      /lib               # Utility functions
    /public              # Static assets
```

## Changing Territory Ownership

Territory assignments are managed in **`apps/territory-map/src/config/ownership.ts`**. This file contains three main objects:

### 1. Country Ownership (`countryOwners`)

Maps ISO-3166-1 alpha-2 country codes to rep IDs:

```typescript
export const countryOwners: Record<string, string> = {
  MX: 'rep-2',  // Mexico → Rep 2
  BR: 'rep-3',  // Brazil → Rep 3
  JP: 'rep-7',  // Japan → Rep 7
  // ... etc
};
```

**To change a country's owner:**
- Find the country code (e.g., `MX` for Mexico, `GB` for United Kingdom)
- Change the value to one of: `'rep-1'` through `'rep-8'`, or `'unassigned'`
- Example: `MX: 'rep-5'` changes Mexico from Rep 2 to Rep 5

**Note:** US and Canada are handled separately (see below), so don't assign them here.

### 2. US State Ownership (`usStateOwners`)

Maps USPS two-letter state codes to rep IDs:

```typescript
export const usStateOwners: Record<string, string> = {
  CA: 'rep-1',    // California → Rep 1
  NY: 'rep-4',    // New York → Rep 4
  TX: 'rep-3',    // Texas → Rep 3
  // ... etc
};
```

**To change a US state's owner:**
- Find the state code (e.g., `CA` for California, `NY` for New York)
- Change the value to `'rep-1'` through `'rep-8'`, or `'unassigned'`
- Example: `TX: 'rep-2'` changes Texas from Rep 3 to Rep 2

### 3. Canadian Province Ownership (`caProvinceOwners`)

Maps two-letter postal abbreviations to rep IDs:

```typescript
export const caProvinceOwners: Record<string, string> = {
  BC: 'rep-1',    // British Columbia → Rep 1
  ON: 'rep-4',    // Ontario → Rep 4
  QC: 'rep-4',    // Quebec → Rep 4
  // ... etc
};
```

**To change a Canadian province's owner:**
- Find the province code (e.g., `BC` for British Columbia, `ON` for Ontario)
- Change the value to `'rep-1'` through `'rep-8'`, or `'unassigned'`
- Example: `ON: 'rep-2'` changes Ontario from Rep 4 to Rep 2

## Logging Territory Changes

**⚠️ IMPORTANT: When you change territory ownership, you MUST also log the change in the changelog.**

All territory ownership changes must be logged in **`apps/territory-map/src/config/changelog.json`**. This includes:
- Changes made manually by editing `ownership.ts`
- Changes made by AI assistants (like Claude Code or Cursor)
- Any reassignments, new assignments, or unassignments

### How to Log a Change

When you change a territory's owner in `ownership.ts`, add a new entry to the `changelog.json` file. The entry should be added at the **beginning** of the array (newest first).

**Entry Format:**
```json
{
  "id": "2025-01-15T10:30:00Z",
  "date": "2025-01-15",
  "timestamp": "2025-01-15T10:30:00Z",
  "territoryCode": "CN",
  "territoryName": "China",
  "territoryType": "Country",
  "oldOwner": "rep-7",
  "newOwner": "unassigned",
  "notes": "Temporarily unassigned due to sanctions"
}
```

**Field Descriptions:**
- `id`: ISO timestamp string (use current date/time: `new Date().toISOString()`)
- `date`: Date in YYYY-MM-DD format (extract from timestamp)
- `timestamp`: Full ISO datetime string (same as `id`)
- `territoryCode`: Territory code (e.g., `"CN"`, `"CA"`, `"HI"`)
- `territoryName`: Full territory name (e.g., `"China"`, `"California"`, `"Hawaii"`)
- `territoryType`: One of `"Country"`, `"US State"`, or `"Canadian Province"`
- `oldOwner`: Previous owner ID (`"rep-1"` through `"rep-8"`, `"unassigned"`, or `null` for new assignments)
- `newOwner`: New owner ID (`"rep-1"` through `"rep-8"`, `"unassigned"`, or `null` for removals)
- `notes`: Optional description of the change

**Example: Moving France from Rep 4 to Rep 5**

1. Update `ownership.ts`:
   ```typescript
   FR: 'rep-5', // France (changed from 'rep-4')
   ```

2. Add entry to `changelog.json` (at the beginning of the array):
   ```json
   {
     "id": "2025-01-20T14:30:00Z",
     "date": "2025-01-20",
     "timestamp": "2025-01-20T14:30:00Z",
     "territoryCode": "FR",
     "territoryName": "France",
     "territoryType": "Country",
     "oldOwner": "rep-4",
     "newOwner": "rep-5",
     "notes": "Reassigned to Rep 5 for better regional coverage"
   }
   ```

**For AI Assistants (Claude Code, Cursor, etc.):**
When making territory ownership changes, you MUST:
1. Update `apps/territory-map/src/config/ownership.ts`
2. Add a corresponding entry to `apps/territory-map/src/config/changelog.json`
3. Use the current date/time for the entry
4. Include the full territory name from `countryNames`, `usStateNames`, or `caProvinceNames`

**Viewing the Changelog:**
Click the "Changelog" button in the map controls bar to view all changes with filtering options.

## Adding or Modifying Reps

Rep definitions are in **`apps/territory-map/src/config/reps.ts`**:

```typescript
export const reps: Rep[] = [
  { id: 'rep-1', name: 'Rep 1', color: 'hsl(210, 100%, 50%)' },   // Blue
  { id: 'rep-2', name: 'Rep 2', color: 'hsl(145, 63%, 42%)' },    // Emerald
  { id: 'rep-3', name: 'Rep 3', color: 'hsl(25, 95%, 53%)' },     // Orange
  { id: 'rep-4', name: 'Rep 4', color: 'hsl(270, 70%, 55%)' },    // Purple
  { id: 'rep-5', name: 'Rep 5', color: 'hsl(0, 80%, 55%)' },      // Red
  { id: 'rep-6', name: 'Rep 6', color: 'hsl(180, 70%, 40%)' },    // Teal
  { id: 'rep-7', name: 'Rep 7', color: 'hsl(45, 90%, 48%)' },     // Gold
  { id: 'rep-8', name: 'Rep 8', color: 'hsl(330, 70%, 55%)' },    // Rose
  { id: 'unassigned', name: 'Unassigned', color: 'hsl(0, 0%, 85%)' }, // Gray
];
```

**To customize rep names:**
1. Edit the `name` field for each rep
2. Keep the `id` field unchanged (used internally)
3. Example: Change `name: 'Rep 1'` to `name: 'Alice Johnson'`

**To change a rep's color:**
- Modify the `color` value in HSL format: `'hsl(hue, saturation%, lightness%)'`
- Example: `'hsl(0, 100%, 50%)'` is red, `'hsl(240, 100%, 50%)'` is blue

**To add a new rep:**
1. Add a new object to the `reps` array with a unique `id` (e.g., `'rep-9'`)
2. Set the `name` (displayed in the UI)
3. Set the `color` (HSL format recommended)
4. Update territory assignments in `ownership.ts` to use the new rep ID where needed

## Quick Reference: Territory Code Formats

- **Countries**: ISO-3166-1 alpha-2 codes (2 letters, uppercase)
  - Examples: `US`, `CA`, `MX`, `GB`, `JP`, `AU`
  - Lookup: [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

- **US States**: USPS two-letter codes (2 letters, uppercase)
  - Examples: `CA`, `NY`, `TX`, `FL`
  - Lookup: [USPS State Abbreviations](https://en.wikipedia.org/wiki/List_of_U.S._state_and_territory_abbreviations)

- **Canadian Provinces**: Two-letter postal abbreviations (2 letters, uppercase)
  - Examples: `BC`, `ON`, `QC`, `AB`
  - Lookup: [Canada Post abbreviations](https://www.canadapost-postescanada.ca/cpc/en/support/articles/addressing/postal-codes/province-territory-abbreviations.page)

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

The app will be available at `http://localhost:3000`

### Tech Stack

- **Next.js 14+** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **react-simple-maps** (map visualization)
- **shadcn-ui** (UI components)

## Deployment

The app is configured for deployment on Vercel. Connect your repository to Vercel and it will automatically detect and deploy the Next.js application.

## License

MIT License - feel free to use this as a template for your own territory management needs.
