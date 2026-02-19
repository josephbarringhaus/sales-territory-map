"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getRepById,
  countryOwners,
  usStateOwners,
  caProvinceOwners,
  countryNames,
  usStateNames,
  caProvinceNames,
} from '@/config';

interface TerritoryListProps {
  selectedRepId: string | null;
}

export const TerritoryList = ({ selectedRepId }: TerritoryListProps) => {
  const [search, setSearch] = useState('');

  const territories = useMemo(() => {

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
        .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
    };

    return {
      countries: filterByRep(countryOwners, countryNames),
      usStates: filterByRep(usStateOwners, usStateNames),
      caProvinces: filterByRep(caProvinceOwners, caProvinceNames),
    };
  }, [selectedRepId, search]);

  const selectedRep = selectedRepId ? getRepById(selectedRepId) : null;

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold mb-1">
          {selectedRep ? `${selectedRep.name}'s Territories` : selectedRepId === 'unassigned' ? 'Unassigned Territories' : 'All Territories'}
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search territories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <TerritorySection
            title="Countries"
            count={territories.countries.length}
            items={territories.countries}
            showRep={!selectedRepId}
          />
          <TerritorySection
            title="US States"
            count={territories.usStates.length}
            items={territories.usStates}
            showRep={!selectedRepId}
          />
          <TerritorySection
            title="Canadian Provinces"
            count={territories.caProvinces.length}
            items={territories.caProvinces}
            showRep={!selectedRepId}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

interface TerritorySectionProps {
  title: string;
  count: number;
  items: Array<{
    code: string;
    name: string;
    repId: string;
    rep: ReturnType<typeof getRepById> | undefined;
  }>;
  showRep: boolean;
}

const TerritorySection = ({ title, count, items, showRep }: TerritorySectionProps) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title} ({count})
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.code}
            className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-muted/50"
          >
            <span>{item.name}</span>
            {showRep && item.rep && (
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.rep.color }}
                title={item.rep.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
