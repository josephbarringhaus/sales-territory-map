"use client";

import { reps, Rep } from '@/config';
import { cn } from '@/lib/utils';

interface RepPickerProps {
  selectedRepId: string | null;
  onSelectRep: (repId: string | null) => void;
}

export const RepPicker = ({ selectedRepId, onSelectRep }: RepPickerProps) => {
  
  return (
    <div className="flex flex-wrap gap-3 p-4">
      <button
        onClick={() => onSelectRep(null)}
        className={cn(
          "px-4 py-2 rounded-lg border-2 transition-all font-medium",
          selectedRepId === null
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-card hover:border-foreground/50"
        )}
      >
        All Reps
      </button>
      {reps.map((rep) => (
        <RepCard
          key={rep.id}
          rep={rep}
          isSelected={selectedRepId === rep.id}
          onClick={() => onSelectRep(rep.id === selectedRepId ? null : rep.id)}
        />
      ))}
    </div>
  );
};

interface RepCardProps {
  rep: Rep;
  isSelected: boolean;
  onClick: () => void;
}

const RepCard = ({ rep, isSelected, onClick }: RepCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg border-2 transition-all",
        isSelected
          ? "border-foreground shadow-lg scale-105"
          : "border-border bg-card hover:border-foreground/50"
      )}
    >
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: rep.color }}
      />
      <span className="font-medium">{rep.name}</span>
    </button>
  );
};
