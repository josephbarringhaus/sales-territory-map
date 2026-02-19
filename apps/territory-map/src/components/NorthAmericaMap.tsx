"use client";

import { useState, useCallback, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
} from 'react-simple-maps';
import { usStateOwners, caProvinceOwners, getRepColor, usStateNames, caProvinceNames } from '@/config';
import { MapTooltip } from './MapTooltip';

const US_STATES_GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const CANADA_GEO_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson';

// US FIPS codes to state abbreviations
const fipsToState: Record<string, string> = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT',
  '10': 'DE', '11': 'DC', '12': 'FL', '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL',
  '18': 'IN', '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME', '24': 'MD',
  '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO', '30': 'MT', '31': 'NE',
  '32': 'NV', '33': 'NH', '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC', '46': 'SD',
  '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV',
  '55': 'WI', '56': 'WY', '72': 'PR',
};

// Canadian province name to abbreviation
const provinceNameToCode: Record<string, string> = {
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Manitoba': 'MB',
  'New Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Nova Scotia': 'NS',
  'Northwest Territories': 'NT',
  'Nunavut': 'NU',
  'Ontario': 'ON',
  'Prince Edward Island': 'PE',
  'Quebec': 'QC',
  'Saskatchewan': 'SK',
  'Yukon': 'YT',
};

interface NorthAmericaMapProps {
  selectedRepId: string | null;
  showLabels: boolean;
  position: { coordinates: [number, number]; zoom: number };
  onPositionChange: (position: { coordinates: [number, number]; zoom: number }) => void;
}

export const NorthAmericaMap = memo(({
  selectedRepId,
  showLabels,
  position,
  onPositionChange,
}: NorthAmericaMapProps) => {
  const [tooltip, setTooltip] = useState<{
    name: string;
    repId: string | undefined;
    x: number;
    y: number;
  } | null>(null);

  const handleUSMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const fips = geo.id;
    const stateCode = fipsToState[fips];
    const name = geo.properties?.name || usStateNames[stateCode] || 'Unknown';
    const repId = usStateOwners[stateCode];
    
    setTooltip({
      name,
      repId,
      x: evt.clientX,
      y: evt.clientY,
    });
  }, [usStateOwners]);

  const handleCAMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const name = geo.properties?.name || 'Unknown';
    const provinceCode = provinceNameToCode[name];
    const repId = caProvinceOwners[provinceCode];
    
    setTooltip({
      name,
      repId,
      x: evt.clientX,
      y: evt.clientY,
    });
  }, [caProvinceOwners]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const getUSStateColor = useCallback((geo: any) => {
    const fips = geo.id;
    const stateCode = fipsToState[fips];
    const repId = usStateOwners[stateCode];
    
    // Handle unassigned filter
    if (selectedRepId === 'unassigned') {
      return repId ? 'hsl(0, 0%, 90%)' : getRepColor(undefined);
    }
    
    if (selectedRepId && repId !== selectedRepId) {
      return 'hsl(0, 0%, 90%)';
    }
    
    return getRepColor(repId);
  }, [selectedRepId]);

  const getCAProvinceColor = useCallback((geo: any) => {
    const name = geo.properties?.name;
    const provinceCode = provinceNameToCode[name];
    const repId = caProvinceOwners[provinceCode];
    
    // Handle unassigned filter
    if (selectedRepId === 'unassigned') {
      return repId ? 'hsl(0, 0%, 90%)' : getRepColor(undefined);
    }
    
    if (selectedRepId && repId !== selectedRepId) {
      return 'hsl(0, 0%, 90%)';
    }
    
    return getRepColor(repId);
  }, [selectedRepId]);

  const getOpacity = useCallback((repId: string | undefined) => {
    if (!selectedRepId) return 1;
    if (selectedRepId === 'unassigned') {
      return repId ? 0.3 : 1;
    }
    return repId === selectedRepId ? 1 : 0.3;
  }, [selectedRepId]);

  // State label positions (approximate centroids)
  const stateLabels: Record<string, [number, number]> = {
    WA: [-120.5, 47.5], OR: [-120.5, 44], CA: [-119.5, 37], NV: [-117, 39],
    ID: [-114.5, 44.5], MT: [-110, 47], WY: [-107.5, 43], UT: [-111.5, 39.5],
    AZ: [-111.5, 34.5], CO: [-105.5, 39], NM: [-106, 34.5], ND: [-100, 47.5],
    SD: [-100, 44.5], NE: [-100, 41.5], KS: [-98.5, 38.5], OK: [-97.5, 35.5],
    TX: [-99, 31], MN: [-94.5, 46], IA: [-93.5, 42], MO: [-92.5, 38.5],
    AR: [-92.5, 35], LA: [-92, 31], WI: [-89.5, 44.5], IL: [-89, 40],
    MS: [-89.5, 33], MI: [-85, 44], IN: [-86, 40], KY: [-85.5, 37.5],
    TN: [-86, 36], AL: [-86.5, 33], OH: [-82.5, 40.5], WV: [-80.5, 39],
    VA: [-79, 37.5], NC: [-79.5, 35.5], SC: [-81, 34], GA: [-83.5, 33],
    FL: [-81.5, 28], PA: [-77.5, 41], NY: [-75, 43], VT: [-72.5, 44],
    NH: [-71.5, 43.5], MA: [-72, 42.3], RI: [-71.5, 41.7], CT: [-72.7, 41.6],
    NJ: [-74.5, 40], DE: [-75.5, 39], MD: [-76.5, 39], ME: [-69, 45.5],
    AK: [-153, 64], HI: [-155.5, 20],
  };

  const provinceLabels: Record<string, [number, number]> = {
    BC: [-125, 54], AB: [-115, 54], SK: [-106, 54], MB: [-98, 54],
    ON: [-85, 50], QC: [-72, 52], NB: [-66, 46.5], NS: [-63, 45],
    PE: [-63, 46.5], NL: [-57, 53], YT: [-135, 64], NT: [-120, 65],
    NU: [-95, 70],
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{
          center: [-5, 40],
          scale: 800,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={onPositionChange}
          minZoom={0.5}
          maxZoom={8}
        >
          {/* US States */}
          <Geographies geography={US_STATES_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id;
                const stateCode = fipsToState[fips];
                const repId = usStateOwners[stateCode];
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getUSStateColor(geo)}
                    stroke="hsl(0, 0%, 100%)"
                    strokeWidth={0.5}
                    opacity={getOpacity(repId)}
                    onMouseEnter={(evt) => handleUSMouseEnter(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', filter: 'brightness(1.1)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Canada Provinces */}
          <Geographies geography={CANADA_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties?.name;
                const provinceCode = provinceNameToCode[name];
                const repId = caProvinceOwners[provinceCode];
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCAProvinceColor(geo)}
                    stroke="hsl(0, 0%, 100%)"
                    strokeWidth={0.5}
                    opacity={getOpacity(repId)}
                    onMouseEnter={(evt) => handleCAMouseEnter(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', filter: 'brightness(1.1)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Labels */}
          {showLabels && (
            <>
              {Object.entries(stateLabels).map(([code, coords]) => (
                <Annotation
                  key={`label-${code}`}
                  subject={coords}
                  dx={0}
                  dy={0}
                  connectorProps={{}}
                >
                  <text
                    className="map-label map-label-na"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ pointerEvents: 'none', fontSize: '7px', fontWeight: 500 }}
                  >
                    {code}
                  </text>
                </Annotation>
              ))}
              {Object.entries(provinceLabels).map(([code, coords]) => (
                <Annotation
                  key={`label-ca-${code}`}
                  subject={coords}
                  dx={0}
                  dy={0}
                  connectorProps={{}}
                >
                  <text
                    className="map-label map-label-na"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ pointerEvents: 'none', fontSize: '7px', fontWeight: 500 }}
                  >
                    {code}
                  </text>
                </Annotation>
              ))}
            </>
          )}
        </ZoomableGroup>
      </ComposableMap>
      
      {tooltip && (
        <MapTooltip
          name={tooltip.name}
          repId={tooltip.repId}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
});

NorthAmericaMap.displayName = 'NorthAmericaMap';
