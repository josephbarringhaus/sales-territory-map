"use client";

import { getRepById } from '@/config/reps';

interface MapTooltipProps {
  name: string;
  repId: string | undefined;
  x: number;
  y: number;
}

export const MapTooltip = ({ name, repId, x, y }: MapTooltipProps) => {
  const rep = repId ? getRepById(repId) : null;

  return (
    <div
      className="fixed z-50 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border pointer-events-none"
      style={{
        left: x + 10,
        top: y - 10,
        transform: 'translateY(-100%)',
      }}
    >
      <div className="font-medium">{name}</div>
      {rep ? (
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: rep.color }}
          />
          <span className="text-muted-foreground">{rep.name}</span>
        </div>
      ) : (
        <div className="text-muted-foreground mt-1">Unassigned</div>
      )}
    </div>
  );
};
