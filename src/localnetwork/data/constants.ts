export const PRINTER_TYPES = [
  'FDM',
  'Resin',
  'CNC',
  'Laser Cutter',
  'Vinyl Cutter',
  'Other',
] as const;
export type PrinterType = (typeof PRINTER_TYPES)[number];

export const COMMON_MATERIALS = [
  'PLA', 'PETG', 'ABS', 'TPU', 'PLA-CF', 'PC',
  'Standard Resin', 'Tough', 'Castable', 'Clear',
  'plywood', 'acrylic', 'leather', 'cardboard', 'felt',
  'aluminum', 'brass', 'steel', 'wood', 'mdf', 'foam',
  'adhesive vinyl', 'HTV', 'cardstock',
];

export const FULFILLMENT_OPTIONS = ['pickup', 'delivery', 'shipping'] as const;
export type Fulfillment = (typeof FULFILLMENT_OPTIONS)[number];

export const AVAILABILITY = ['available', 'busy', 'offline'] as const;
export type Availability = (typeof AVAILABILITY)[number];

export const URGENCY = ['flexible', 'standard', 'rush', 'same-day'] as const;
export type Urgency = (typeof URGENCY)[number];

export const NETWORK_CITIES: { id: string; name: string; center: [number, number]; zoom: number }[] = [
  { id: 'sf', name: 'San Francisco', center: [37.762, -122.435], zoom: 12 },
  { id: 'la', name: 'Los Angeles', center: [34.052, -118.280], zoom: 11 },
  { id: 'nyc', name: 'New York City', center: [40.712, -74.006], zoom: 11 },
  { id: 'boston', name: 'Boston', center: [42.361, -71.057], zoom: 12 },
];

export const PRINTER_COLORS: Record<string, string> = {
  'FDM':           '--lib-color',
  'Resin':         '--make-color',
  'CNC':           '--uni-color',
  'Laser Cutter':  '--lib-color',
  'Vinyl Cutter':  '--make-color',
  'Other':         '--uni-color',
};