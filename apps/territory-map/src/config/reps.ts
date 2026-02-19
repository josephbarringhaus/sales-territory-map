export interface Rep {
  id: string;
  name: string;
  color: string;
}

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

export const getRepById = (id: string): Rep | undefined => {
  return reps.find(rep => rep.id === id);
};

export const getRepColor = (repId: string | undefined): string => {
  if (!repId) return 'hsl(0, 0%, 85%)'; // Neutral gray for unassigned
  const rep = getRepById(repId);
  return rep?.color || 'hsl(0, 0%, 85%)';
};
