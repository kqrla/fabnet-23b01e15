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

import { CITIES } from '@/data/cities';

export const NETWORK_CITIES: {
  id: string; name: string; center: [number, number]; zoom: number;
  zips: Record<string, [number, number]>;
}[] = CITIES.map(c => ({
  id: c.id, name: c.name, center: c.center, zoom: c.zoom - 1, zips: c.zips,
}));

export const PRINTER_COLORS: Record<string, string> = {
  'FDM':           '--lib-color',
  'Resin':         '--make-color',
  'CNC':           '--uni-color',
  'Laser Cutter':  '--lib-color',
  'Vinyl Cutter':  '--make-color',
  'Other':         '--uni-color',
};