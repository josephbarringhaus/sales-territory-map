import {
  getRepById,
  countryOwners,
  usStateOwners,
  caProvinceOwners,
  countryNames,
  usStateNames,
  caProvinceNames,
} from '@/config';

export function exportToCSV(selectedRepId: string | null) {

  const filterByRep = (owners: Record<string, string>, names: Record<string, string>) => {
    return Object.entries(owners)
      .filter(([_, repId]) => {
        if (!selectedRepId) return true;
        if (selectedRepId === 'unassigned') return !repId;
        return repId === selectedRepId;
      })
      .map(([code, repId]) => ({
        code,
        name: names[code] || code,
        repId,
        rep: getRepById(repId),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const countries = filterByRep(countryOwners, countryNames);
  const usStates = filterByRep(usStateOwners, usStateNames);
  const caProvinces = filterByRep(caProvinceOwners, caProvinceNames);

  // Combine all territories
  const allTerritories = [
    ...countries.map(t => ({ territory: t.name, owner: t.rep?.name || 'Unassigned', type: 'Country' })),
    ...usStates.map(t => ({ territory: t.name, owner: t.rep?.name || 'Unassigned', type: 'US State' })),
    ...caProvinces.map(t => ({ territory: t.name, owner: t.rep?.name || 'Unassigned', type: 'Canadian Province' })),
  ].sort((a, b) => {
    // Sort by owner first, then by territory name
    if (a.owner !== b.owner) {
      return a.owner.localeCompare(b.owner);
    }
    return a.territory.localeCompare(b.territory);
  });

  // Create CSV content
  const headers = ['Owner', 'Territory', 'Type'];
  const rows = allTerritories.map(t => [
    t.owner,
    t.territory,
    t.type,
  ]);

  // Escape CSV values (handle commas and quotes)
  const escapeCSV = (value: string) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(',')),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  // Generate filename based on selection
  let filename = 'territories';
  if (selectedRepId === 'unassigned') {
    filename = 'unassigned-territories';
  } else if (selectedRepId) {
    const rep = getRepById(selectedRepId);
    filename = rep ? `${rep.name.toLowerCase().replace(/\s+/g, '-')}-territories` : 'territories';
  } else {
    filename = 'all-territories';
  }
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

