// Country ownership (ISO-3166-1 alpha-2 codes)
// US and Canada are handled separately (states/provinces)
export const countryOwners: Record<string, string> = {
  // Rep 1: Oceania/Pacific
  AU: 'rep-7', // Australia
  NZ: 'rep-1', // New Zealand
  FJ: 'rep-1', // Fiji
  PG: 'rep-1', // Papua New Guinea
  SB: 'rep-1', // Solomon Islands
  WS: 'rep-1', // Samoa
  TO: 'rep-1', // Tonga
  VU: 'rep-1', // Vanuatu
  KI: 'rep-1', // Kiribati
  FM: 'rep-1', // Micronesia
  MH: 'rep-1', // Marshall Islands
  NR: 'rep-1', // Nauru
  PW: 'rep-1', // Palau
  TV: 'rep-1', // Tuvalu
  NC: 'rep-1', // New Caledonia

  // Rep 2: Central America & Caribbean
  MX: 'rep-2', // Mexico
  GT: 'rep-2', // Guatemala
  HN: 'rep-2', // Honduras
  SV: 'rep-2', // El Salvador
  NI: 'rep-2', // Nicaragua
  CR: 'rep-2', // Costa Rica
  PA: 'rep-2', // Panama
  BZ: 'rep-2', // Belize
  DO: 'rep-2', // Dominican Republic
  HT: 'rep-2', // Haiti
  BS: 'rep-2', // Bahamas
  AG: 'rep-2', // Antigua and Barbuda
  BB: 'rep-2', // Barbados
  DM: 'rep-2', // Dominica
  GD: 'rep-2', // Grenada
  JM: 'rep-2', // Jamaica
  KN: 'rep-2', // Saint Kitts and Nevis
  LC: 'rep-2', // Saint Lucia
  VC: 'rep-2', // Saint Vincent and the Grenadines
  TT: 'rep-2', // Trinidad and Tobago
  PR: 'rep-2', // Puerto Rico

  // Rep 3: South America
  AR: 'rep-3', // Argentina
  BO: 'rep-3', // Bolivia
  BR: 'rep-3', // Brazil
  CL: 'rep-3', // Chile
  CO: 'rep-3', // Colombia
  EC: 'rep-3', // Ecuador
  GY: 'rep-3', // Guyana
  PY: 'rep-3', // Paraguay
  PE: 'rep-3', // Peru
  SR: 'rep-3', // Suriname
  UY: 'rep-3', // Uruguay
  GF: 'rep-3', // French Guiana
  FK: 'rep-3', // Falkland Islands

  // Rep 4: Northern Europe
  GB: 'rep-4', // United Kingdom
  IE: 'rep-4', // Ireland
  NO: 'rep-4', // Norway
  SE: 'rep-4', // Sweden
  DK: 'rep-4', // Denmark
  FI: 'rep-4', // Finland
  NL: 'rep-4', // Netherlands
  BE: 'rep-4', // Belgium
  LU: 'rep-4', // Luxembourg
  IS: 'rep-4', // Iceland
  GL: 'rep-4', // Greenland

  // Rep 5: Western/Southern Europe & Balkans
  FR: 'rep-5', // France
  DE: 'rep-5', // Germany
  ES: 'rep-5', // Spain
  IT: 'rep-5', // Italy
  GR: 'rep-5', // Greece
  PT: 'rep-5', // Portugal
  CH: 'rep-5', // Switzerland
  AT: 'rep-5', // Austria
  PL: 'rep-5', // Poland
  CZ: 'rep-5', // Czech Republic
  HU: 'rep-5', // Hungary
  RO: 'rep-5', // Romania
  BG: 'rep-5', // Bulgaria
  HR: 'rep-5', // Croatia
  RS: 'rep-5', // Serbia
  BA: 'rep-5', // Bosnia and Herzegovina
  ME: 'rep-5', // Montenegro
  AL: 'rep-5', // Albania
  MK: 'rep-5', // North Macedonia
  XK: 'rep-5', // Kosovo
  SI: 'rep-5', // Slovenia
  SK: 'rep-5', // Slovakia
  EE: 'rep-5', // Estonia
  LV: 'rep-5', // Latvia
  LT: 'rep-5', // Lithuania
  CY: 'rep-5', // Cyprus
  MT: 'rep-5', // Malta
  AD: 'rep-5', // Andorra
  MC: 'rep-5', // Monaco
  SM: 'rep-5', // San Marino
  VA: 'rep-5', // Vatican City
  LI: 'rep-5', // Liechtenstein
  MD: 'rep-5', // Moldova
  UA: 'rep-5', // Ukraine

  // Rep 6: Middle East & South Asia
  TR: 'rep-6', // Turkey
  SA: 'rep-6', // Saudi Arabia
  AE: 'rep-6', // United Arab Emirates
  IL: 'rep-6', // Israel
  JO: 'rep-6', // Jordan
  LB: 'rep-6', // Lebanon
  IQ: 'rep-6', // Iraq
  KW: 'rep-6', // Kuwait
  QA: 'rep-6', // Qatar
  BH: 'rep-6', // Bahrain
  OM: 'rep-6', // Oman
  PS: 'rep-6', // Palestine
  AM: 'rep-6', // Armenia
  AZ: 'rep-6', // Azerbaijan
  GE: 'rep-6', // Georgia
  IN: 'rep-6', // India
  PK: 'rep-6', // Pakistan
  BD: 'rep-6', // Bangladesh
  LK: 'rep-6', // Sri Lanka
  NP: 'rep-6', // Nepal
  BT: 'rep-6', // Bhutan
  MV: 'rep-6', // Maldives
  KZ: 'rep-6', // Kazakhstan
  UZ: 'rep-6', // Uzbekistan
  KG: 'rep-6', // Kyrgyzstan

  // Rep 7: East/Southeast Asia
  JP: 'rep-7', // Japan
  KR: 'rep-7', // South Korea
  TH: 'rep-7', // Thailand
  VN: 'rep-7', // Vietnam
  ID: 'rep-7', // Indonesia
  PH: 'rep-7', // Philippines
  MY: 'rep-7', // Malaysia
  SG: 'rep-7', // Singapore
  KH: 'rep-7', // Cambodia
  LA: 'rep-7', // Laos
  BN: 'rep-7', // Brunei
  TL: 'rep-7', // Timor-Leste
  MN: 'rep-7', // Mongolia
  TW: 'rep-7', // Taiwan

  // Rep 8: Africa
  NG: 'rep-8', // Nigeria
  ZA: 'rep-8', // South Africa
  EG: 'rep-8', // Egypt
  KE: 'rep-8', // Kenya
  GH: 'rep-8', // Ghana
  MA: 'rep-8', // Morocco
  TN: 'rep-8', // Tunisia
  DZ: 'rep-8', // Algeria
  AO: 'rep-8', // Angola
  ET: 'rep-8', // Ethiopia
  TZ: 'rep-8', // Tanzania
  UG: 'rep-8', // Uganda
  SD: 'rep-8', // Sudan
  MZ: 'rep-8', // Mozambique
  CM: 'rep-8', // Cameroon
  CI: 'rep-8', // Ivory Coast
  NE: 'rep-8', // Niger
  BF: 'rep-8', // Burkina Faso
  ML: 'rep-8', // Mali
  MW: 'rep-8', // Malawi
  ZM: 'rep-8', // Zambia
  SN: 'rep-8', // Senegal
  TD: 'rep-8', // Chad
  RW: 'rep-8', // Rwanda
  BJ: 'rep-8', // Benin
  BI: 'rep-8', // Burundi
  TG: 'rep-8', // Togo
  SL: 'rep-8', // Sierra Leone
  LR: 'rep-8', // Liberia
  CF: 'rep-8', // Central African Republic
  MR: 'rep-8', // Mauritania
  NA: 'rep-8', // Namibia
  BW: 'rep-8', // Botswana
  GA: 'rep-8', // Gabon
  GN: 'rep-8', // Guinea
  CG: 'rep-8', // Congo (Republic of the)
  LS: 'rep-8', // Lesotho
  GW: 'rep-8', // Guinea-Bissau
  GM: 'rep-8', // Gambia
  GQ: 'rep-8', // Equatorial Guinea
  MU: 'rep-8', // Mauritius
  SZ: 'rep-8', // Eswatini
  DJ: 'rep-8', // Djibouti
  KM: 'rep-8', // Comoros
  CV: 'rep-8', // Cabo Verde
  ST: 'rep-8', // Sao Tome and Principe
  SC: 'rep-8', // Seychelles
  XS: 'rep-8', // Somaliland (if available in geo data)
  EH: 'rep-8', // Western Sahara
  MG: 'rep-8', // Madagascar

  // Previously unassigned territories (now assigned to nearest regional rep)
  CU: 'rep-2', // Cuba - Caribbean region
  VE: 'rep-3', // Venezuela - South America region
  CN: 'rep-7', // China - East Asia region
  KP: 'rep-7', // North Korea - East Asia region
  MM: 'rep-7', // Myanmar - Southeast Asia region
  AF: 'rep-6', // Afghanistan - South Asia region
  IR: 'rep-6', // Iran - Middle East region
  SY: 'rep-6', // Syria - Middle East region
  TJ: 'rep-6', // Tajikistan - Central Asia region
  TM: 'rep-6', // Turkmenistan - Central Asia region
  BY: 'rep-5', // Belarus - Eastern Europe region
  RU: 'unassigned', // Russia
  LY: 'rep-8', // Libya - North Africa region
  SO: 'rep-8', // Somalia - East Africa region
  SS: 'rep-8', // South Sudan - East Africa region
  ER: 'rep-8', // Eritrea - East Africa region
  CD: 'rep-8', // Congo (DRC) - Central Africa region
  ZW: 'rep-8', // Zimbabwe - Southern Africa region
  YE: 'rep-6', // Yemen - Middle East region
};

// US State ownership (USPS two-letter codes)
export const usStateOwners: Record<string, string> = {
  // Rep 1: Pacific/NW
  WA: 'rep-1', // Washington
  OR: 'rep-1', // Oregon
  CA: 'rep-1', // California
  NV: 'rep-1', // Nevada
  HI: 'rep-1', // Hawaii
  AK: 'rep-1', // Alaska

  // Rep 2: Mountain/Central
  ID: 'rep-2', // Idaho
  MT: 'rep-2', // Montana
  WY: 'rep-2', // Wyoming
  CO: 'rep-2', // Colorado
  UT: 'rep-2', // Utah
  AZ: 'rep-2', // Arizona
  NM: 'rep-2', // New Mexico
  ND: 'rep-2', // North Dakota
  SD: 'rep-2', // South Dakota
  NE: 'rep-2', // Nebraska
  KS: 'rep-2', // Kansas
  MN: 'rep-2', // Minnesota
  IA: 'rep-2', // Iowa

  // Rep 3: South
  TX: 'rep-3', // Texas
  OK: 'rep-3', // Oklahoma
  AR: 'rep-3', // Arkansas
  LA: 'rep-3', // Louisiana
  MS: 'rep-3', // Mississippi
  AL: 'rep-3', // Alabama
  TN: 'rep-3', // Tennessee
  KY: 'rep-3', // Kentucky
  FL: 'rep-3', // Florida
  GA: 'rep-3', // Georgia
  SC: 'rep-3', // South Carolina
  NC: 'rep-3', // North Carolina
  VA: 'rep-3', // Virginia
  WV: 'rep-3', // West Virginia

  // Rep 4: NE/Midwest
  ME: 'rep-4', // Maine
  NH: 'rep-4', // New Hampshire
  VT: 'rep-4', // Vermont
  MA: 'rep-4', // Massachusetts
  RI: 'rep-4', // Rhode Island
  CT: 'rep-4', // Connecticut
  NY: 'rep-4', // New York
  NJ: 'rep-4', // New Jersey
  PA: 'rep-4', // Pennsylvania
  DE: 'rep-4', // Delaware
  MD: 'rep-4', // Maryland
  OH: 'rep-4', // Ohio
  IN: 'rep-4', // Indiana
  IL: 'rep-4', // Illinois
  MI: 'rep-4', // Michigan
  WI: 'rep-4', // Wisconsin
  MO: 'rep-4', // Missouri
};

// Canadian Province/Territory ownership (two-letter postal abbreviations)
export const caProvinceOwners: Record<string, string> = {
  // Rep 1: Western Canada
  BC: 'rep-1', // British Columbia
  AB: 'rep-1', // Alberta
  YT: 'rep-1', // Yukon

  // Rep 2: Central/Northern Canada
  SK: 'rep-2', // Saskatchewan
  MB: 'rep-2', // Manitoba
  NT: 'rep-2', // Northwest Territories
  NU: 'rep-2', // Nunavut

  // Rep 4: Eastern Canada
  ON: 'rep-4', // Ontario
  QC: 'rep-4', // Quebec
  NB: 'rep-4', // New Brunswick
  NS: 'rep-4', // Nova Scotia
  PE: 'rep-4', // Prince Edward Island
  NL: 'rep-4', // Newfoundland and Labrador
};

// Helper to get country name from ISO code
export const countryNames: Record<string, string> = {
  MX: 'Mexico', GT: 'Guatemala', HN: 'Honduras', SV: 'El Salvador',
  NI: 'Nicaragua', CR: 'Costa Rica', PA: 'Panama', CU: 'Cuba', DO: 'Dominican Republic',
  BZ: 'Belize', AR: 'Argentina', BO: 'Bolivia', BR: 'Brazil', CL: 'Chile', CO: 'Colombia',
  EC: 'Ecuador', GY: 'Guyana', PY: 'Paraguay', PE: 'Peru', SR: 'Suriname',
  UY: 'Uruguay', VE: 'Venezuela', GF: 'French Guiana', FK: 'Falkland Islands',
  AL: 'Albania', AD: 'Andorra', AT: 'Austria',
  BY: 'Belarus', BE: 'Belgium', BA: 'Bosnia and Herzegovina', BG: 'Bulgaria',
  HR: 'Croatia', CY: 'Cyprus', CZ: 'Czech Republic', DK: 'Denmark', EE: 'Estonia',
  FI: 'Finland', FR: 'France', DE: 'Germany', GR: 'Greece', HU: 'Hungary',
  IS: 'Iceland', IE: 'Ireland', IT: 'Italy', XK: 'Kosovo', LV: 'Latvia',
  LI: 'Liechtenstein', LT: 'Lithuania', LU: 'Luxembourg', MT: 'Malta', MD: 'Moldova',
  MC: 'Monaco', ME: 'Montenegro', NL: 'Netherlands', MK: 'North Macedonia',
  NO: 'Norway', PL: 'Poland', PT: 'Portugal', RO: 'Romania', SM: 'San Marino',
  RS: 'Serbia', SK: 'Slovakia', SI: 'Slovenia', ES: 'Spain', SE: 'Sweden',
  CH: 'Switzerland', UA: 'Ukraine', GB: 'United Kingdom', VA: 'Vatican City',
  RU: 'Russia', GL: 'Greenland',
  AM: 'Armenia', AZ: 'Azerbaijan', BH: 'Bahrain', GE: 'Georgia', IR: 'Iran',
  IQ: 'Iraq', IL: 'Israel', JO: 'Jordan', KW: 'Kuwait', LB: 'Lebanon',
  OM: 'Oman', QA: 'Qatar', SA: 'Saudi Arabia', SY: 'Syria', TR: 'Turkey',
  AE: 'United Arab Emirates', YE: 'Yemen', PS: 'Palestine', DZ: 'Algeria', AO: 'Angola',
  BJ: 'Benin', BW: 'Botswana', BF: 'Burkina Faso', BI: 'Burundi', CV: 'Cabo Verde',
  CM: 'Cameroon', CF: 'Central African Republic', TD: 'Chad', KM: 'Comoros',
  CG: 'Congo (Republic)', CD: 'Congo (DRC)', DJ: 'Djibouti', EG: 'Egypt',
  GQ: 'Equatorial Guinea', ER: 'Eritrea', SZ: 'Eswatini', ET: 'Ethiopia',
  GA: 'Gabon', GM: 'Gambia', GH: 'Ghana', GN: 'Guinea', GW: 'Guinea-Bissau',
  CI: 'Ivory Coast', KE: 'Kenya', LS: 'Lesotho', LR: 'Liberia', LY: 'Libya',
  MG: 'Madagascar', MW: 'Malawi', ML: 'Mali', MR: 'Mauritania', MU: 'Mauritius',
  MA: 'Morocco', MZ: 'Mozambique', NA: 'Namibia', NE: 'Niger', NG: 'Nigeria',
  RW: 'Rwanda', ST: 'Sao Tome and Principe', SN: 'Senegal', SC: 'Seychelles',
  SL: 'Sierra Leone', SO: 'Somalia', XS: 'Somaliland', ZA: 'South Africa', SS: 'South Sudan',
  SD: 'Sudan', TZ: 'Tanzania', TG: 'Togo', TN: 'Tunisia', UG: 'Uganda',
  ZM: 'Zambia', ZW: 'Zimbabwe', EH: 'Western Sahara', AF: 'Afghanistan', BD: 'Bangladesh', BT: 'Bhutan',
  BN: 'Brunei', KH: 'Cambodia', CN: 'China', IN: 'India', ID: 'Indonesia',
  JP: 'Japan', KZ: 'Kazakhstan', KG: 'Kyrgyzstan', LA: 'Laos', MY: 'Malaysia',
  MV: 'Maldives', MN: 'Mongolia', MM: 'Myanmar', NP: 'Nepal', KP: 'North Korea',
  PK: 'Pakistan', PH: 'Philippines', SG: 'Singapore', KR: 'South Korea',
  LK: 'Sri Lanka', TJ: 'Tajikistan', TH: 'Thailand', TL: 'Timor-Leste',
  TM: 'Turkmenistan', UZ: 'Uzbekistan', VN: 'Vietnam', TW: 'Taiwan', AU: 'Australia',
  NZ: 'New Zealand', FJ: 'Fiji', PG: 'Papua New Guinea', SB: 'Solomon Islands',
  WS: 'Samoa', TO: 'Tonga', VU: 'Vanuatu', KI: 'Kiribati', FM: 'Micronesia',
  MH: 'Marshall Islands', NR: 'Nauru', PW: 'Palau', TV: 'Tuvalu', NC: 'New Caledonia',
  AG: 'Antigua and Barbuda', BS: 'Bahamas', BB: 'Barbados', DM: 'Dominica',
  GD: 'Grenada', HT: 'Haiti', JM: 'Jamaica', KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia', VC: 'Saint Vincent and the Grenadines', TT: 'Trinidad and Tobago',
  PR: 'Puerto Rico', US: 'United States', CA: 'Canada',
};

// US State names
export const usStateNames: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

// Canadian Province/Territory names
export const caProvinceNames: Record<string, string> = {
  AB: 'Alberta', BC: 'British Columbia', MB: 'Manitoba', NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador', NS: 'Nova Scotia', NT: 'Northwest Territories',
  NU: 'Nunavut', ON: 'Ontario', PE: 'Prince Edward Island', QC: 'Quebec',
  SK: 'Saskatchewan', YT: 'Yukon',
};
