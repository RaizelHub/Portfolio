export type WorldBuildingType = 'project' | 'collection' | 'collab' | 'developer';

export type WorldBuilding = {
  id: string;
  label: string;
  subtitle: string;
  type: WorldBuildingType;
  x: number;
  y: number;
  width: number;
  height: number;
  projectSlugs: string[];
  accent: 'copper' | 'slate' | 'sand' | 'emerald';
  isWIP?: boolean;
  status?: string;
};

export type WayfindingSign = {
  id: string;
  text: string;
  x: number;
  y: number;
  direction?: 'left' | 'right' | 'up' | 'down';
};

export const worldBuildings: WorldBuilding[] = [
  {
    id: 'subora-building',
    label: 'SUBORA',
    subtitle: '01 / MOBILE PRODUCT',
    type: 'project',
    x: 220,
    y: 70,
    width: 250,
    height: 410,
    projectSlugs: ['subora'],
    accent: 'copper',
    isWIP: true,
    status: 'In Development',
  },
  {
    id: 'collab-hq',
    label: 'COLLAB HQ',
    subtitle: 'CAMPUS CENTER',
    type: 'collab',
    x: 940,
    y: 50,
    width: 320,
    height: 440,
    projectSlugs: ['collabcanvas'],
    accent: 'sand',
  },
  {
    id: 'vocara-building',
    label: 'VOCARA',
    subtitle: '02 / MOBILE AI',
    type: 'project',
    x: 1730,
    y: 70,
    width: 250,
    height: 410,
    projectSlugs: ['vocara'],
    accent: 'slate',
  },
  {
    id: 'smart-pipe-building',
    label: 'SMART PIPE',
    subtitle: '03 / IOT SYSTEM',
    type: 'project',
    x: 220,
    y: 860,
    width: 250,
    height: 410,
    projectSlugs: ['smartpipe'],
    accent: 'slate',
  },
  {
    id: 'web-desktop-studio',
    label: 'WEB & DESKTOP',
    subtitle: 'ENTERPRISE APPS',
    type: 'collection',
    x: 720,
    y: 860,
    width: 270,
    height: 410,
    projectSlugs: ['studio-ecommerce', 'careeros', 'restaurant-ai-ops', 'receivables-control-center'],
    accent: 'sand',
  },
  {
    id: 'developer-studio',
    label: 'DEV STUDIO',
    subtitle: 'ABOUT / RESUME',
    type: 'developer',
    x: 1210,
    y: 860,
    width: 270,
    height: 410,
    projectSlugs: [],
    accent: 'sand',
  },
  {
    id: 'automation-lab',
    label: 'AUTOMATION LAB',
    subtitle: 'WORKFLOWS / AI',
    type: 'collection',
    x: 1730,
    y: 860,
    width: 250,
    height: 410,
    projectSlugs: ['omniflow-ai', 'tiktok-shop-automation', 'jobradar-ai'],
    accent: 'copper',
  },
];

export const wayfindingSigns: WayfindingSign[] = [
  { id: 'sign-plaza-west', text: '← SUBORA & IOT TOWER', x: 600, y: 590, direction: 'left' },
  { id: 'sign-plaza-north', text: '↑ COLLAB HQ TOWER', x: 1100, y: 530, direction: 'up' },
  { id: 'sign-plaza-east', text: 'VOCARA & AUTOMATION TOWER →', x: 1600, y: 590, direction: 'right' },
  { id: 'sign-plaza-south', text: '↓ DEV STUDIO & ENTERPRISE HUB', x: 1100, y: 770, direction: 'down' },
];

export const campusPaths = [
  // Central Main Boulevard
  { x: 1040, y: 490, width: 120, height: 380 },
  // East-West Central Plaza Connector
  { x: 345, y: 580, width: 1510, height: 120 },
  // North-South West Corridor (Subora <-> Smart Pipe)
  { x: 295, y: 480, width: 100, height: 380 },
  // North-South East Corridor (Vocara <-> Automation Lab)
  { x: 1805, y: 480, width: 100, height: 380 },
  // South District Corridor (Connecting Web Studio & Dev Studio)
  { x: 720, y: 800, width: 760, height: 70 },
];
