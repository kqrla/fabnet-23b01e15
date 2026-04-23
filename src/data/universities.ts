import type { Location } from '@/lib/api';

export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  type: 'university' | 'community-college';
}

export type UniversityLocation = Location & { universityId: string };

export const UNIVERSITIES: University[] = [
  // ── San Francisco ──────────────────────────────────────────────────────────
  { id: 'sfsu',             name: 'SF State University',                     shortName: 'SFSU',              city: 'San Francisco', type: 'university' },
  { id: 'ucb',              name: 'UC Berkeley',                             shortName: 'UC Berkeley',       city: 'San Francisco', type: 'university' },
  { id: 'ccsf',             name: 'City College of San Francisco',           shortName: 'CCSF',              city: 'San Francisco', type: 'community-college' },
  { id: 'college-of-marin', name: 'College of Marin',                        shortName: 'College of Marin',  city: 'San Francisco', type: 'community-college' },
  // ── Los Angeles ────────────────────────────────────────────────────────────
  { id: 'ucla',             name: 'UCLA',                                    shortName: 'UCLA',              city: 'Los Angeles', type: 'university' },
  { id: 'usc',              name: 'University of Southern California',       shortName: 'USC',               city: 'Los Angeles', type: 'university' },
  { id: 'smc',              name: 'Santa Monica College',                    shortName: 'Santa Monica College', city: 'Los Angeles', type: 'community-college' },
  { id: 'pcc',              name: 'Pasadena City College',                   shortName: 'Pasadena City College', city: 'Los Angeles', type: 'community-college' },
  { id: 'lacc',             name: 'Los Angeles City College',                shortName: 'LACC',              city: 'Los Angeles', type: 'community-college' },
  // ── New York City ──────────────────────────────────────────────────────────
  { id: 'nyu',              name: 'New York University',                     shortName: 'NYU',               city: 'New York City', type: 'university' },
  { id: 'columbia',         name: 'Columbia University',                     shortName: 'Columbia',          city: 'New York City', type: 'university' },
  { id: 'cooper',           name: 'The Cooper Union',                        shortName: 'Cooper Union',      city: 'New York City', type: 'university' },
  { id: 'laguardia',        name: 'LaGuardia Community College (CUNY)',      shortName: 'LaGuardia CC',      city: 'New York City', type: 'community-college' },
  { id: 'bmcc',             name: 'Borough of Manhattan Community College',  shortName: 'BMCC',              city: 'New York City', type: 'community-college' },
  // ── Boston ─────────────────────────────────────────────────────────────────
  { id: 'mit',              name: 'MIT',                                     shortName: 'MIT',               city: 'Boston', type: 'university' },
  { id: 'harvard',          name: 'Harvard University',                      shortName: 'Harvard',           city: 'Boston', type: 'university' },
  { id: 'northeastern',     name: 'Northeastern University',                 shortName: 'Northeastern',      city: 'Boston', type: 'university' },
  { id: 'bu',               name: 'Boston University',                       shortName: 'BU',                city: 'Boston', type: 'university' },
  { id: 'bhcc',             name: 'Bunker Hill Community College',           shortName: 'Bunker Hill CC',    city: 'Boston', type: 'community-college' },
  { id: 'massbay',          name: 'MassBay Community College',               shortName: 'MassBay CC',        city: 'Boston', type: 'community-college' },
];

export const UNIVERSITY_LOCATIONS: UniversityLocation[] = [
  // ── SFSU ───────────────────────────────────────────────────────────────────
  {
    id: 'uni-sfsu-1', universityId: 'sfsu',
    name: 'SFSU Library Maker Lab',
    latitude: 37.7241, longitude: -122.4793,
    type: 'University',
    capabilities: ['3D Printing', 'Vinyl Cutting / Cricut', 'Electronics'],
    membershipCost: 'Free for SFSU students (SFSU ID required)',
    sourceLink: 'https://library.sfsu.edu',
    notes: 'Maker Lab in the J. Paul Leonard Library. Equipment booking available for enrolled students.',
  },
  // ── UC Berkeley ────────────────────────────────────────────────────────────
  {
    id: 'uni-ucb-1', universityId: 'ucb',
    name: 'Jacobs Institute for Design Innovation',
    latitude: 37.8719, longitude: -122.2586,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'CNC', 'Woodworking', 'Electronics'],
    membershipCost: 'Free for UC Berkeley students (CalNet ID required)',
    sourceLink: 'https://jacobsinstitute.berkeley.edu',
    notes: 'State-of-the-art fabrication facility. Open studio hours for enrolled students. Some events open to public.',
  },
  // ── CCSF ───────────────────────────────────────────────────────────────────
  {
    id: 'uni-ccsf-1', universityId: 'ccsf',
    name: 'CCSF STEM Center — Maker Resources',
    latitude: 37.7253, longitude: -122.4526,
    type: 'University',
    capabilities: ['3D Printing', 'Electronics', 'Vinyl Cutting / Cricut'],
    membershipCost: 'Free for enrolled CCSF students (student ID required)',
    sourceLink: 'https://www.ccsf.edu/en/student-services/stem-center.html',
    notes: 'Maker resources available at the STEM Center. Equipment access for enrolled CCSF students.',
  },
  // ── College of Marin ───────────────────────────────────────────────────────
  {
    id: 'uni-marin-1', universityId: 'college-of-marin',
    name: 'College of Marin — Design & Fabrication Lab',
    latitude: 37.9735, longitude: -122.5311,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting'],
    membershipCost: 'Free for enrolled College of Marin students',
    sourceLink: 'https://www.marin.edu',
    notes: 'Fabrication resources available in the Design Technology department.',
  },
  // ── UCLA ───────────────────────────────────────────────────────────────────
  {
    id: 'uni-ucla-1', universityId: 'ucla',
    name: 'UCLA Boelter MakerSpace',
    latitude: 34.0681, longitude: -118.4430,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics', 'PCB'],
    membershipCost: 'Free for UCLA students and staff',
    sourceLink: 'https://samueli.ucla.edu/makerspace',
    notes: 'Located in Boelter Hall. Full-service fabrication lab for engineering and design students.',
  },
  // ── USC ────────────────────────────────────────────────────────────────────
  {
    id: 'uni-usc-1', universityId: 'usc',
    name: 'USC Viterbi MakerSpace',
    latitude: 34.0219, longitude: -118.2852,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'CNC', 'Resin Printing'],
    membershipCost: 'Free for USC students (USC ID required)',
    sourceLink: 'https://viterbi.usc.edu/makerspace',
    notes: 'Fabrication lab in the Viterbi School of Engineering. Safety orientation required before equipment use.',
  },
  // ── Santa Monica College ───────────────────────────────────────────────────
  {
    id: 'uni-smc-1', universityId: 'smc',
    name: 'Santa Monica College — Maker & Innovation Lab',
    latitude: 34.0271, longitude: -118.4790,
    type: 'University',
    capabilities: ['3D Printing', 'Vinyl Cutting / Cricut', 'Electronics'],
    membershipCost: 'Free for enrolled SMC students',
    sourceLink: 'https://www.smc.edu',
    notes: 'Innovation lab resources available for currently enrolled SMC students.',
  },
  // ── Pasadena City College ──────────────────────────────────────────────────
  {
    id: 'uni-pcc-1', universityId: 'pcc',
    name: 'PCC Technology & Fabrication Center',
    latitude: 34.1476, longitude: -118.1102,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'CNC'],
    membershipCost: 'Free for enrolled PCC students (PCC ID required)',
    sourceLink: 'https://www.pasadena.edu',
    notes: 'Fabrication resources in the Engineering and Technology division.',
  },
  // ── LACC ───────────────────────────────────────────────────────────────────
  {
    id: 'uni-lacc-1', universityId: 'lacc',
    name: 'LACC Design & Tech Maker Lab',
    latitude: 34.0698, longitude: -118.2921,
    type: 'University',
    capabilities: ['3D Printing', 'Electronics'],
    membershipCost: 'Free for enrolled LACC students',
    sourceLink: 'https://www.lacitycollege.edu',
    notes: 'Maker resources available through the Design & Technology department.',
  },
  // ── NYU ────────────────────────────────────────────────────────────────────
  {
    id: 'uni-nyu-1', universityId: 'nyu',
    name: 'NYU Tandon MakerSpace',
    latitude: 40.6940, longitude: -73.9869,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics', 'PCB', 'Vinyl Cutting / Cricut'],
    membershipCost: 'Free for NYU students (NetID required)',
    sourceLink: 'https://engineering.nyu.edu/research-innovation/makerspace',
    notes: 'Full-featured makerspace at Tandon School of Engineering in Brooklyn. Safety training required.',
  },
  // ── Columbia ───────────────────────────────────────────────────────────────
  {
    id: 'uni-columbia-1', universityId: 'columbia',
    name: 'Columbia University Makerspace',
    latitude: 40.8075, longitude: -73.9626,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics'],
    membershipCost: 'Free for Columbia students (UNI required)',
    sourceLink: 'https://makerspace.columbia.edu',
    notes: 'Student makerspace with self-service 3D printing and laser cutting. Workshops available.',
  },
  // ── Cooper Union ──────────────────────────────────────────────────────────
  {
    id: 'uni-cooper-1', universityId: 'cooper',
    name: 'Cooper Union Fabrication Lab',
    latitude: 40.7293, longitude: -73.9907,
    type: 'University',
    capabilities: ['3D Printing', 'CNC', 'Laser Cutting', 'Electronics', 'PCB'],
    membershipCost: 'Free for Cooper Union students',
    sourceLink: 'https://cooper.edu/engineering/fabrication-lab',
    notes: 'Advanced fab lab at the Cooper Union School of Engineering. Limited access for external visitors.',
  },
  // ── LaGuardia CC ──────────────────────────────────────────────────────────
  {
    id: 'uni-laguardia-1', universityId: 'laguardia',
    name: 'LaGuardia CC — STEM Makerspace',
    latitude: 40.7454, longitude: -73.9445,
    type: 'University',
    capabilities: ['3D Printing', 'Electronics', 'Vinyl Cutting / Cricut'],
    membershipCost: 'Free for enrolled LaGuardia students (CUNY ID required)',
    sourceLink: 'https://www.laguardia.edu',
    notes: 'STEM makerspace resources available for currently enrolled LaGuardia CC students.',
  },
  // ── BMCC ──────────────────────────────────────────────────────────────────
  {
    id: 'uni-bmcc-1', universityId: 'bmcc',
    name: 'BMCC Technology Learning Center',
    latitude: 40.7178, longitude: -74.0141,
    type: 'University',
    capabilities: ['3D Printing', 'Electronics'],
    membershipCost: 'Free for enrolled BMCC students (CUNY ID required)',
    sourceLink: 'https://www.bmcc.cuny.edu',
    notes: 'Maker and technology resources available for enrolled BMCC students at the Technology Learning Center.',
  },
  // ── MIT ────────────────────────────────────────────────────────────────────
  {
    id: 'uni-mit-1', universityId: 'mit',
    name: 'MIT Metropolis Maker Workshop',
    latitude: 42.3594, longitude: -71.0938,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'CNC', 'Electronics', 'PCB', 'Woodworking'],
    membershipCost: 'Free for MIT students and staff (MIT Kerberos required)',
    sourceLink: 'https://studentlife.mit.edu/metropolis',
    notes: 'State-of-the-art maker workshop for the MIT community. Multiple 3D printers, laser cutters, and CNC machines.',
  },
  // ── Harvard ───────────────────────────────────────────────────────────────
  {
    id: 'uni-harvard-1', universityId: 'harvard',
    name: 'Harvard Innovation Lab',
    latitude: 42.3678, longitude: -71.1219,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics'],
    membershipCost: 'Free for Harvard students and affiliates (Harvard ID required)',
    sourceLink: 'https://innovationlabs.harvard.edu',
    notes: 'Fabrication resources alongside co-working space. Primarily for Harvard student entrepreneurs.',
  },
  // ── Northeastern ─────────────────────────────────────────────────────────
  {
    id: 'uni-northeastern-1', universityId: 'northeastern',
    name: 'Northeastern ISEC MakerSpace',
    latitude: 42.3388, longitude: -71.0878,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics', 'PCB'],
    membershipCost: 'Free for Northeastern students (NUID required)',
    sourceLink: 'https://coe.northeastern.edu/research/isec',
    notes: 'Located in the Interdisciplinary Science & Engineering Complex. Safety orientation required.',
  },
  // ── BU ────────────────────────────────────────────────────────────────────
  {
    id: 'uni-bu-1', universityId: 'bu',
    name: 'BU Engineering Product Innovation Center',
    latitude: 42.3505, longitude: -71.1052,
    type: 'University',
    capabilities: ['3D Printing', 'Laser Cutting', 'Electronics', 'CNC'],
    membershipCost: 'Free for BU students (BU ID required)',
    sourceLink: 'https://bu.edu/eng/epic',
    notes: 'EPIC facility in the Engineering building. Focus on product design and prototyping. Reservation required.',
  },
  // ── Bunker Hill CC ────────────────────────────────────────────────────────
  {
    id: 'uni-bhcc-1', universityId: 'bhcc',
    name: 'Bunker Hill CC — STEM Maker Lab',
    latitude: 42.3762, longitude: -71.0672,
    type: 'University',
    capabilities: ['3D Printing', 'Electronics'],
    membershipCost: 'Free for enrolled Bunker Hill CC students',
    sourceLink: 'https://www.bhcc.edu',
    notes: 'STEM maker resources available for currently enrolled BHCC students.',
  },
  // ── MassBay CC ───────────────────────────────────────────────────────────
  {
    id: 'uni-massbay-1', universityId: 'massbay',
    name: 'MassBay CC — Fabrication Resources',
    latitude: 42.3318, longitude: -71.2296,
    type: 'University',
    capabilities: ['3D Printing'],
    membershipCost: 'Free for enrolled MassBay students',
    sourceLink: 'https://www.massbay.edu',
    notes: '3D printing and fabrication resources for currently enrolled MassBay Community College students.',
  },
];
