import { reps } from '@/config/reps';

export const Legend = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card border-t border-border">
      <span className="text-sm font-medium text-muted-foreground">Legend:</span>
      {reps.map((rep) => (
        <div key={rep.id} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: rep.color }}
          />
          <span className="text-sm">{rep.name}</span>
        </div>
      ))}
    </div>
  );
};
