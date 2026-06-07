/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'tentang' | 'program' | 'relawan' | 'kontak';

export interface Route {
  id: PageId;
  label: string;
  path: string;
}

export interface VolunteerRegistration {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  skill: string;
  motivation: string;
}

export interface ProgramDetails {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  shortDesc: string;
  description: string;
  objectives: string[];
  expectedImpact: string[];
  themeColor: string;
}
