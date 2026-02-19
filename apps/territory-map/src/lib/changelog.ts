export interface ChangelogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO datetime string
  territoryCode: string;
  territoryName: string;
  territoryType: 'Country' | 'US State' | 'Canadian Province';
  oldOwner: string | null;
  newOwner: string | null;
  notes?: string;
}

export interface ChangelogFilters {
  territorySearch?: string;
  oldOwner?: string | null;
  newOwner?: string | null;
  territoryType?: 'Country' | 'US State' | 'Canadian Province' | 'All';
  dateRange?: {
    start?: string; // YYYY-MM-DD
    end?: string; // YYYY-MM-DD
  };
}

/**
 * Load changelog entries from JSON file
 * In Next.js, we can import JSON directly
 */
export async function loadChangelog(): Promise<ChangelogEntry[]> {
  try {
    // Direct import of JSON file (Next.js supports this)
    // The path alias @/config maps to src/config
    const changelog = await import('@/config/changelog.json');
    return (changelog.default || changelog) as ChangelogEntry[];
  } catch (error) {
    console.error('Failed to load changelog:', error);
    return [];
  }
}

/**
 * Filter changelog entries based on criteria
 */
export function filterChangelog(
  entries: ChangelogEntry[],
  filters: ChangelogFilters
): ChangelogEntry[] {
  let filtered = [...entries];

  // Territory search (name or code)
  if (filters.territorySearch) {
    const search = filters.territorySearch.toLowerCase();
    filtered = filtered.filter(
      (entry) =>
        entry.territoryName.toLowerCase().includes(search) ||
        entry.territoryCode.toLowerCase().includes(search)
    );
  }

  // Old owner filter
  if (filters.oldOwner !== undefined) {
    if (filters.oldOwner === null) {
      // Filter for unassigned (null)
      filtered = filtered.filter((entry) => entry.oldOwner === null);
    } else {
      filtered = filtered.filter((entry) => entry.oldOwner === filters.oldOwner);
    }
  }

  // New owner filter
  if (filters.newOwner !== undefined) {
    if (filters.newOwner === null) {
      // Filter for unassigned (null)
      filtered = filtered.filter((entry) => entry.newOwner === null);
    } else {
      filtered = filtered.filter((entry) => entry.newOwner === filters.newOwner);
    }
  }

  // Territory type filter
  if (filters.territoryType && filters.territoryType !== 'All') {
    filtered = filtered.filter((entry) => entry.territoryType === filters.territoryType);
  }

  // Date range filter
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    if (start) {
      filtered = filtered.filter((entry) => entry.date >= start);
    }
    if (end) {
      filtered = filtered.filter((entry) => entry.date <= end);
    }
  }

  return filtered;
}

/**
 * Helper function to create a new changelog entry
 * This is for manual use when adding entries to the JSON file
 */
export function createChangelogEntry(
  territoryCode: string,
  territoryName: string,
  territoryType: 'Country' | 'US State' | 'Canadian Province',
  oldOwner: string | null,
  newOwner: string | null,
  notes?: string
): ChangelogEntry {
  const now = new Date();
  const timestamp = now.toISOString();
  const date = timestamp.split('T')[0]; // YYYY-MM-DD

  return {
    id: timestamp,
    date,
    timestamp,
    territoryCode,
    territoryName,
    territoryType,
    oldOwner,
    newOwner,
    notes,
  };
}

/**
 * Format owner name for display
 */
export function formatOwnerName(ownerId: string | null): string {
  if (ownerId === null) return 'Unassigned';

  // Dynamic lookup from reps config
  // Import at runtime to avoid circular dependencies
  try {
    const { getRepById } = require('@/config');
    const rep = getRepById(ownerId);
    return rep?.name || ownerId;
  } catch {
    return ownerId;
  }
}

