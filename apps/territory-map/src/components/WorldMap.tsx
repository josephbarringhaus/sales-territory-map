"use client";

import { useState, useCallback, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { countryOwners, usStateOwners, caProvinceOwners, getRepColor, countryNames } from '@/config';
import { MapTooltip } from './MapTooltip';

const WORLD_GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
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

// ISO numeric to alpha-2 mapping for countries
// Map uses string IDs that may or may not have leading zeros
const numericToAlpha2: Record<string, string> = {
  // With and without leading zeros for compatibility
  '4': 'AF', '004': 'AF', '8': 'AL', '008': 'AL', '12': 'DZ', '012': 'DZ', 
  '20': 'AD', '020': 'AD', '24': 'AO', '024': 'AO', '28': 'AG', '028': 'AG', 
  '31': 'AZ', '031': 'AZ', '32': 'AR', '032': 'AR', '36': 'AU', '036': 'AU', 
  '40': 'AT', '040': 'AT', '44': 'BS', '044': 'BS', '48': 'BH', '048': 'BH', 
  '50': 'BD', '050': 'BD', '51': 'AM', '051': 'AM', '52': 'BB', '052': 'BB', 
  '56': 'BE', '056': 'BE', '60': 'BM', '060': 'BM', '64': 'BT', '064': 'BT', 
  '68': 'BO', '068': 'BO', '70': 'BA', '070': 'BA', '72': 'BW', '072': 'BW', 
  '76': 'BR', '076': 'BR', '84': 'BZ', '084': 'BZ', '96': 'BN', '096': 'BN', 
  '100': 'BG', '104': 'MM', '108': 'BI', '112': 'BY', '116': 'KH', '120': 'CM', 
  '124': 'CA', '132': 'CV', '140': 'CF', '144': 'LK', '148': 'TD', '152': 'CL', 
  '156': 'CN', '158': 'TW', '170': 'CO', '174': 'KM', '178': 'CG', '180': 'CD', 
  '188': 'CR', '191': 'HR', '192': 'CU', '196': 'CY', '203': 'CZ', '204': 'BJ', 
  '208': 'DK', '212': 'DM', '214': 'DO', '218': 'EC', '222': 'SV', '226': 'GQ', 
  '231': 'ET', '232': 'ER', '233': 'EE', '238': 'FK', '242': 'FJ', '246': 'FI', 
  '250': 'FR', '254': 'GF', '260': 'TF', '262': 'DJ', '266': 'GA', '268': 'GE', 
  '270': 'GM', '275': 'PS', '276': 'DE', '288': 'GH', '300': 'GR', '304': 'GL', 
  '308': 'GD', '320': 'GT', '324': 'GN', '328': 'GY', '332': 'HT', '340': 'HN', 
  '348': 'HU', '352': 'IS', '356': 'IN', '360': 'ID', '364': 'IR', '368': 'IQ', 
  '372': 'IE', '376': 'IL', '380': 'IT', '384': 'CI', '388': 'JM', '392': 'JP', 
  '398': 'KZ', '400': 'JO', '404': 'KE', '408': 'KP', '410': 'KR', '414': 'KW', 
  '417': 'KG', '418': 'LA', '422': 'LB', '426': 'LS', '428': 'LV', '430': 'LR', 
  '434': 'LY', '438': 'LI', '440': 'LT', '442': 'LU', '450': 'MG', '454': 'MW', 
  '458': 'MY', '462': 'MV', '466': 'ML', '470': 'MT', '478': 'MR', '480': 'MU', 
  '484': 'MX', '496': 'MN', '498': 'MD', '499': 'ME', '504': 'MA', '508': 'MZ', 
  '512': 'OM', '516': 'NA', '524': 'NP', '528': 'NL', '540': 'NC', '548': 'VU', 
  '554': 'NZ', '558': 'NI', '562': 'NE', '566': 'NG', '578': 'NO', '586': 'PK', 
  '591': 'PA', '598': 'PG', '600': 'PY', '604': 'PE', '608': 'PH', '616': 'PL', 
  '620': 'PT', '624': 'GW', '626': 'TL', '630': 'PR', '634': 'QA', '642': 'RO', 
  '643': 'RU', '646': 'RW', '682': 'SA', '686': 'SN', '688': 'RS', '694': 'SL', 
  '702': 'SG', '703': 'SK', '704': 'VN', '705': 'SI', '706': 'SO', '710': 'ZA', 
  '716': 'ZW', '724': 'ES', '728': 'SS', '729': 'SD', '732': 'EH', '740': 'SR', 
  '748': 'SZ', '752': 'SE', '756': 'CH', '760': 'SY', '762': 'TJ', '764': 'TH', 
  '768': 'TG', '780': 'TT', '784': 'AE', '788': 'TN', '792': 'TR', '795': 'TM', 
  '800': 'UG', '804': 'UA', '807': 'MK', '818': 'EG', '826': 'GB', '834': 'TZ', 
  '840': 'US', '854': 'BF', '858': 'UY', '860': 'UZ', '862': 'VE', '887': 'YE', 
  '894': 'ZM', '-99': 'XK',
};

// Country label positions (approximate centroids for major countries)
// Expanded European countries due to major presence
const countryLabelPositions: Record<string, [number, number]> = {
  // North America
  US: [-98, 39], CA: [-106, 56], MX: [-102, 24],
  // South America - major countries only
  BR: [-53, -10], AR: [-64, -34], CO: [-72, 4], CL: [-71, -35],
  // Europe - expanded list
  GB: [-2, 54], FR: [2, 46], DE: [10, 51], IT: [12, 43], ES: [-4, 40],
  NL: [5, 52], BE: [4.5, 50.5], CH: [8, 47], AT: [13.5, 47.5],
  SE: [18, 60], NO: [10, 62], DK: [10, 56], FI: [26, 64],
  PL: [20, 52], CZ: [15, 50], PT: [-8, 40], GR: [23, 39],
  IE: [-8, 53], HU: [19.5, 47.5], RO: [25, 46], BG: [25.5, 43],
  // Asia - major countries only
  RU: [100, 60], CN: [105, 35], IN: [78, 22], JP: [138, 36],
  KR: [128, 36], PK: [69, 30], TH: [101, 15], VN: [106, 16],
  // Middle East - major only
  SA: [45, 24], TR: [35, 39], AE: [54, 24], IL: [35, 31],
  // Africa - major only
  ZA: [25, -29], NG: [8, 10], EG: [30, 27],
  // Oceania
  AU: [134, -25], NZ: [174, -41],
};

interface WorldMapProps {
  selectedRepId: string | null;
  showLabels: boolean;
  labelMode: 'major' | 'all';
  position: { coordinates: [number, number]; zoom: number };
  onPositionChange: (position: { coordinates: [number, number]; zoom: number }) => void;
  onCountryClick: (countryCode: string) => void;
}

export const WorldMap = memo(({
  selectedRepId,
  showLabels,
  labelMode,
  position,
  onPositionChange,
  onCountryClick,
}: WorldMapProps) => {
  const [tooltip, setTooltip] = useState<{
    name: string;
    repId: string | undefined;
    x: number;
    y: number;
  } | null>(null);

  const handleCountryMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
    let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];
    
    const name = geo.properties?.name || countryNames[iso2] || 'Unknown';
    
    // Handle Somaliland (XS) - check by ISO code or name
    if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
      iso2 = 'XS';
    }
    
    // Skip US and Canada - they're handled by state/province layers
    if (iso2 === 'US' || iso2 === 'CA') return;
    
    const repId = countryOwners[iso2];
    
    setTooltip({ name, repId, x: evt.clientX, y: evt.clientY });
  }, [countryOwners]);

  const handleUSStateMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const fips = geo.id;
    const stateCode = fipsToState[fips];
    const name = geo.properties?.name || stateCode || 'Unknown';
    const repId = usStateOwners[stateCode];
    
    setTooltip({ name, repId, x: evt.clientX, y: evt.clientY });
  }, [usStateOwners]);

  const handleCAProvinceMouseEnter = useCallback((geo: any, evt: React.MouseEvent) => {
    const name = geo.properties?.name || 'Unknown';
    const provinceCode = provinceNameToCode[name];
    const repId = caProvinceOwners[provinceCode];
    
    setTooltip({ name, repId, x: evt.clientX, y: evt.clientY });
  }, [caProvinceOwners]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleCountryClick = useCallback((geo: any) => {
    const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
    let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];
    
    const name = geo.properties?.name;
    
    // Handle Somaliland (XS) - check by ISO code or name
    if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
      iso2 = 'XS';
    }
    
    if (iso2 === 'US' || iso2 === 'CA') {
      onCountryClick(iso2);
    }
  }, [onCountryClick]);

  const handleUSCAClick = useCallback(() => {
    onCountryClick('US');
  }, [onCountryClick]);

  const getCountryColor = useCallback((geo: any) => {
    const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
    let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];

    const name = geo.properties?.name;

    // Handle Somaliland (XS) - check by ISO code or name
    if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
      iso2 = 'XS';
    }

    // Handle French Guiana - geodata often uses FR for it, but we want GF
    if (name === 'French Guiana' || name === 'Guyane' || geo.properties?.['ISO_A2'] === 'GF') {
      iso2 = 'GF';
    }

    // Hide US and Canada from world layer (they're rendered separately)
    if (iso2 === 'US' || iso2 === 'CA') {
      return 'transparent';
    }

    const repId = countryOwners[iso2];
    
    // Handle unassigned filter
    if (selectedRepId === 'unassigned') {
      return repId ? 'hsl(0, 0%, 90%)' : getRepColor(undefined);
    }
    
    if (selectedRepId && repId !== selectedRepId) {
      return 'hsl(0, 0%, 90%)';
    }
    
    return getRepColor(repId);
  }, [selectedRepId]);

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

  const getCountryOpacity = useCallback((geo: any) => {
    if (!selectedRepId) return 1;
    
    const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
    let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];
    
    const name = geo.properties?.name;
    
    // Handle Somaliland (XS) - check by ISO code or name
    if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
      iso2 = 'XS';
    }
    
    if (iso2 === 'US' || iso2 === 'CA') return 0;
    
    const repId = countryOwners[iso2];
    if (selectedRepId === 'unassigned') {
      return repId ? 0.3 : 1;
    }
    return repId === selectedRepId ? 1 : 0.3;
  }, [selectedRepId]);

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={onPositionChange}
          minZoom={1}
          maxZoom={8}
        >
          {/* World countries (excluding US and Canada) */}
          <Geographies geography={WORLD_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
                let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];
                
                const name = geo.properties?.name;
                
                // Handle Somaliland (XS) - check by ISO code or name
                if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
                  iso2 = 'XS';
                }
                
                // Skip US and Canada - rendered separately
                if (iso2 === 'US' || iso2 === 'CA') return null;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(geo)}
                    stroke="hsl(0, 0%, 100%)"
                    strokeWidth={0.5}
                    opacity={getCountryOpacity(geo)}
                    onMouseEnter={(evt) => handleCountryMouseEnter(geo, evt)}
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
                    strokeWidth={0.3}
                    opacity={getOpacity(repId)}
                    onMouseEnter={(evt) => handleUSStateMouseEnter(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleUSCAClick}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', filter: 'brightness(1.1)', cursor: 'pointer' },
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
                    strokeWidth={0.3}
                    opacity={getOpacity(repId)}
                    onMouseEnter={(evt) => handleCAProvinceMouseEnter(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleUSCAClick}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', filter: 'brightness(1.1)', cursor: 'pointer' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Labels for countries */}
          {showLabels && (
            labelMode === 'major' ? (
              // Major countries only - use hardcoded positions
              Object.entries(countryLabelPositions).map(([iso2, coords]) => (
                <Annotation
                  key={`label-${iso2}`}
                  subject={coords}
                  dx={0}
                  dy={0}
                  connectorProps={{}}
                >
                  <text
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ 
                      pointerEvents: 'none', 
                      fontSize: '6px', 
                      fontWeight: 600,
                      fill: 'hsl(0, 0%, 30%)',
                      textShadow: '0 0 3px white, 0 0 3px white'
                    }}
                  >
                    {iso2}
                  </text>
                </Annotation>
              ))
            ) : (
              // All countries - calculate centroids dynamically
              <Geographies geography={WORLD_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isoNumeric = geo.id || geo.properties?.['ISO_A3'];
                    let iso2 = numericToAlpha2[isoNumeric] || geo.properties?.['ISO_A2'];
                    
                    const name = geo.properties?.name;
                    
                    // Handle Somaliland (XS) - check by ISO code or name
                    if (geo.properties?.['ISO_A2'] === 'XS' || geo.properties?.ISO_A2 === 'XS' || name === 'Somaliland') {
                      iso2 = 'XS';
                    }
                    
                    // Skip US and Canada in "all" mode - they're handled by state/province layers
                    // But we can show their labels if they're in the hardcoded positions
                    if (iso2 === 'US' || iso2 === 'CA') {
                      // Only show if in hardcoded positions (for major mode they're already shown)
                      if (countryLabelPositions[iso2]) {
                        const coords = countryLabelPositions[iso2];
                        return (
                          <Annotation
                            key={`label-${iso2}`}
                            subject={coords}
                            dx={0}
                            dy={0}
                            connectorProps={{}}
                          >
                            <text
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              style={{ 
                                pointerEvents: 'none', 
                                fontSize: '6px', 
                                fontWeight: 600,
                                fill: 'hsl(0, 0%, 30%)',
                                textShadow: '0 0 3px white, 0 0 3px white'
                              }}
                            >
                              {iso2}
                            </text>
                          </Annotation>
                        );
                      }
                      return null;
                    }
                    
                    // Skip if no country code or not in ownership list
                    if (!iso2 || !countryOwners[iso2]) return null;
                    
                    // Calculate centroid from geometry, or use hardcoded position as fallback
                    let centroid: [number, number] | null = null;
                    try {
                      // Try to get centroid from the geography geometry
                      if (geo.geometry) {
                        centroid = geoCentroid(geo.geometry);
                      }
                    } catch (e) {
                      // Fallback to hardcoded position if centroid calculation fails
                    }
                    
                    // Use hardcoded position if available, otherwise skip if no centroid
                    if (!centroid) {
                      centroid = countryLabelPositions[iso2] || null;
                      if (!centroid) return null;
                    }
                    
                    return (
                      <Annotation
                        key={`label-${iso2}-${geo.rsmKey}`}
                        subject={centroid}
                        dx={0}
                        dy={0}
                        connectorProps={{}}
                      >
                        <text
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          style={{ 
                            pointerEvents: 'none', 
                            fontSize: '6px', 
                            fontWeight: 600,
                            fill: 'hsl(0, 0%, 30%)',
                            textShadow: '0 0 3px white, 0 0 3px white'
                          }}
                        >
                          {iso2}
                        </text>
                      </Annotation>
                    );
                  })
                }
              </Geographies>
            )
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

WorldMap.displayName = 'WorldMap';
