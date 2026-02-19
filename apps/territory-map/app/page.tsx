"use client";

import { useState, useCallback } from 'react';
import { WorldMap } from '@/components/WorldMap';
import { NorthAmericaMap } from '@/components/NorthAmericaMap';
import { RepPicker } from '@/components/RepPicker';
import { MapControls } from '@/components/MapControls';
import { Legend } from '@/components/Legend';
import { TerritoryList } from '@/components/TerritoryList';
import { ChangelogDialog } from '@/components/ChangelogDialog';
import { exportToCSV } from '@/lib/csv-export';

type MapView = 'world' | 'north-america';

type LabelMode = 'major' | 'all';

export default function Home() {
  const [selectedRepId, setSelectedRepId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<MapView>('world');
  const [showLabels, setShowLabels] = useState(true);
  const [labelMode, setLabelMode] = useState<LabelMode>('major');
  const [changelogOpen, setChangelogOpen] = useState(false);
  
  const [worldPosition, setWorldPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [0, 20], zoom: 1.5 });
  
  const [naPosition, setNAPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [-95, 40], zoom: 1.2 });

  const handleCountryClick = useCallback((countryCode: string) => {
    if (countryCode === 'US' || countryCode === 'CA') {
      setCurrentView('north-america');
    }
  }, []);

  const handleBackToWorld = useCallback(() => {
    setCurrentView('world');
  }, []);

  const handleZoomIn = useCallback(() => {
    if (currentView === 'world') {
      setWorldPosition((prev) => ({
        ...prev,
        zoom: Math.min(prev.zoom * 1.5, 8),
      }));
    } else {
      setNAPosition((prev) => ({
        ...prev,
        zoom: Math.min(prev.zoom * 1.5, 8),
      }));
    }
  }, [currentView]);

  const handleZoomOut = useCallback(() => {
    if (currentView === 'world') {
      setWorldPosition((prev) => ({
        ...prev,
        zoom: Math.max(prev.zoom / 1.5, 1),
      }));
    } else {
      setNAPosition((prev) => ({
        ...prev,
        zoom: Math.max(prev.zoom / 1.5, 0.5),
      }));
    }
  }, [currentView]);

  const handleReset = useCallback(() => {
    if (currentView === 'world') {
      setWorldPosition({ coordinates: [0, 20], zoom: 1.5 });
    } else {
      setNAPosition({ coordinates: [-95, 40], zoom: 1.2 });
    }
  }, [currentView]);

  const viewLabel = currentView === 'world' 
    ? 'World View — Click US or Canada to drill down' 
    : 'North America — US States & Canadian Provinces';

  const handleExportCSV = useCallback(() => {
    exportToCSV(selectedRepId);
  }, [selectedRepId]);

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col min-w-0">
        <RepPicker selectedRepId={selectedRepId} onSelectRep={setSelectedRepId} />
        
        <MapControls
          showLabels={showLabels}
          onToggleLabels={setShowLabels}
          labelMode={labelMode}
          onLabelModeChange={setLabelMode}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          showBackButton={currentView === 'north-america'}
          onBack={handleBackToWorld}
          viewLabel={viewLabel}
          onExportCSV={handleExportCSV}
          onOpenChangelog={() => setChangelogOpen(true)}
                  />

        <div className="flex-1 relative overflow-hidden">
          {currentView === 'world' ? (
            <WorldMap
              selectedRepId={selectedRepId}
              showLabels={showLabels}
              labelMode={labelMode}
              position={worldPosition}
              onPositionChange={setWorldPosition}
              onCountryClick={handleCountryClick}
                          />
          ) : (
            <NorthAmericaMap
              selectedRepId={selectedRepId}
              showLabels={showLabels}
              position={naPosition}
              onPositionChange={setNAPosition}
                          />
          )}
        </div>

        <Legend />
      </div>

      <TerritoryList selectedRepId={selectedRepId} />

      <ChangelogDialog open={changelogOpen} onOpenChange={setChangelogOpen} />
    </div>
  );
}
