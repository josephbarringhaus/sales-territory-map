"use client";

import { ZoomIn, ZoomOut, RotateCcw, Tag, ArrowLeft, Download, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type LabelMode = 'major' | 'all';

interface MapControlsProps {
  showLabels: boolean;
  onToggleLabels: (show: boolean) => void;
  labelMode: LabelMode;
  onLabelModeChange: (mode: LabelMode) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  viewLabel: string;
  onExportCSV?: () => void;
  onOpenChangelog?: () => void;
}

export const MapControls = ({
  showLabels,
  onToggleLabels,
  labelMode,
  onLabelModeChange,
  onZoomIn,
  onZoomOut,
  onReset,
  showBackButton,
  onBack,
  viewLabel,
  onExportCSV,
  onOpenChangelog,
}: MapControlsProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        {showBackButton && onBack && (
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            World View
          </Button>
        )}
        <span className="text-sm font-medium text-muted-foreground">
          {viewLabel}
        </span>
        {onOpenChangelog && (
          <Button variant="outline" size="sm" onClick={onOpenChangelog}>
            <History className="w-4 h-4 mr-2" />
            Changelog
          </Button>
        )}
      </div>

      <div className="flex items-center gap-6">
        {onExportCSV && (
          <Button variant="outline" size="sm" onClick={onExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Switch
            id="labels"
            checked={showLabels}
            onCheckedChange={onToggleLabels}
          />
          <Label htmlFor="labels" className="flex items-center gap-1 cursor-pointer">
            <Tag className="w-4 h-4" />
            Labels
          </Label>
          {showLabels && (
            <Select value={labelMode} onValueChange={onLabelModeChange}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="major">Major Labels</SelectItem>
                <SelectItem value="all">All Labels</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
