"use client";

import { useState, useEffect, useMemo } from 'react';
import { History, Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChangelogEntry,
  ChangelogFilters,
  loadChangelog,
  filterChangelog,
  formatOwnerName,
} from '@/lib/changelog';
import { reps } from '@/config/reps';

interface ChangelogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangelogDialog = ({ open, onOpenChange }: ChangelogDialogProps) => {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ChangelogFilters>({
    territorySearch: '',
    oldOwner: undefined,
    newOwner: undefined,
    territoryType: 'All',
  });

  useEffect(() => {
    if (open) {
      loadChangelog().then((loadedEntries) => {
        setEntries(loadedEntries);
        setLoading(false);
      });
    }
  }, [open]);

  const filteredEntries = useMemo(() => {
    return filterChangelog(entries, filters);
  }, [entries, filters]);

  const sortedEntries = useMemo(() => {
    return [...filteredEntries].sort((a, b) => {
      // Sort by timestamp, newest first
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [filteredEntries]);

  const handleClearFilters = () => {
    setFilters({
      territorySearch: '',
      oldOwner: undefined,
      newOwner: undefined,
      territoryType: 'All',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Territory Ownership Changelog
          </DialogTitle>
          <DialogDescription>
            View and filter all territory ownership changes
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search territory..."
                value={filters.territorySearch || ''}
                onChange={(e) =>
                  setFilters({ ...filters, territorySearch: e.target.value || undefined })
                }
                className="pl-9"
              />
            </div>

            <Select
              value={filters.oldOwner === undefined ? 'all' : filters.oldOwner || 'unassigned'}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  oldOwner: value === 'all' ? undefined : value === 'unassigned' ? null : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Old Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Old Owners</SelectItem>
                {reps.filter((rep) => rep.id !== 'unassigned').map((rep) => (
                  <SelectItem key={rep.id} value={rep.id}>
                    {rep.name}
                  </SelectItem>
                ))}
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.newOwner === undefined ? 'all' : filters.newOwner || 'unassigned'}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  newOwner: value === 'all' ? undefined : value === 'unassigned' ? null : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="New Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All New Owners</SelectItem>
                {reps.filter((rep) => rep.id !== 'unassigned').map((rep) => (
                  <SelectItem key={rep.id} value={rep.id}>
                    {rep.name}
                  </SelectItem>
                ))}
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.territoryType || 'All'}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  territoryType: value === 'All' ? 'All' : (value as ChangelogEntry['territoryType']),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Territory Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Country">Country</SelectItem>
                <SelectItem value="US State">US State</SelectItem>
                <SelectItem value="Canadian Province">Canadian Province</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear filters button */}
          {(filters.territorySearch ||
            filters.oldOwner !== undefined ||
            filters.newOwner !== undefined ||
            filters.territoryType !== 'All') && (
            <Button variant="outline" size="sm" onClick={handleClearFilters} className="w-fit">
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {sortedEntries.length} of {entries.length} changes
          </div>

          {/* Table */}
          <ScrollArea className="flex-1 border rounded-md">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading changelog...</div>
            ) : sortedEntries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No changes found matching your filters.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Territory</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-mono text-xs">
                        {formatDate(entry.date)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{entry.territoryName}</div>
                        <div className="text-xs text-muted-foreground">{entry.territoryCode}</div>
                      </TableCell>
                      <TableCell>{entry.territoryType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={entry.oldOwner ? '' : 'text-muted-foreground'}>
                            {formatOwnerName(entry.oldOwner)}
                          </span>
                          <span className="text-muted-foreground">→</span>
                          <span className={entry.newOwner ? '' : 'text-muted-foreground'}>
                            {formatOwnerName(entry.newOwner)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

