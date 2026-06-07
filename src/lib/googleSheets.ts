/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

// Cache the access token in memory
let cachedAccessToken: string | null = null;
let connectedEmail: string | null = null;

export interface VolunteerData {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  skill: string;
  motivation: string;
  createdAt: string;
}

/**
 * Trigger Firebase Google Auth Popup with Spreadsheet scopes
 */
export async function connectGoogleSheets(): Promise<{ accessToken: string; email: string } | null> {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;
    
    if (!token) {
      throw new Error('Gagal mendapatkan token otentikasi Google Sheets.');
    }
    
    cachedAccessToken = token;
    connectedEmail = result.user.email || 'Akun Google';
    return { accessToken: token, email: connectedEmail };
  } catch (error) {
    console.error('Google Sheets Connection Error:', error);
    throw error;
  }
}

/**
 * Accessor for the active cached token
 */
export function getSheetsAccessToken(): string | null {
  return cachedAccessToken;
}

/**
 * Clear cached token on disconnect
 */
export async function disconnectGoogleSheets(): Promise<void> {
  try {
    cachedAccessToken = null;
    connectedEmail = null;
    // We can choose to keep firebase login but remove token
  } catch (err) {
    console.error('Disconnect error:', err);
  }
}

/**
 * Retrieve spreadsheet title headers
 */
function getHeaders(): string[] {
  return [
    'Tanggal Registrasi',
    'Nama Lengkap',
    'Alamat Email',
    'Nomor WhatsApp',
    'Kota Domisili',
    'Bidang Keahlian',
    'Motivasi Bergabung'
  ];
}

/**
 * Create a brand new Google Spreadsheet in the user's Google Drive
 */
export async function createVolunteerSpreadsheet(accessToken: string): Promise<string> {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: 'NHE Foundation - Pendaftaran Relawan',
        },
        sheets: [
          {
            properties: {
              title: 'Daftar Relawan',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gagal membuat Spreadsheet: ${errorText}`);
    }

    const data = await response.json();
    const spreadsheetId = data.spreadsheetId;
    
    if (!spreadsheetId) {
      throw new Error('Spreadsheet ID tidak valid dari respons Google API.');
    }

    // Set initial header rows
    await initializeSpreadsheetHeaders(accessToken, spreadsheetId);
    
    return spreadsheetId;
  } catch (error) {
    console.error('Create Spreadsheet Error:', error);
    throw error;
  }
}

/**
 * Initialize row 1 header values
 */
async function initializeSpreadsheetHeaders(accessToken: string, spreadsheetId: string): Promise<void> {
  const headers = getHeaders();
  const range = 'Daftar Relawan!A1:G1';
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values: [headers],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.warn('Gagal menginisialisasi baris header Spreadsheet:', errorText);
  }
}

/**
 * Append a row of volunteer data to the target Spreadsheet
 */
export async function appendVolunteerToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  volunteer: VolunteerData
): Promise<void> {
  const row = [
    volunteer.createdAt,
    volunteer.fullName,
    volunteer.email,
    volunteer.whatsapp,
    volunteer.city,
    volunteer.skill,
    volunteer.motivation,
  ];

  const range = 'Daftar Relawan!A:G';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [row],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal menyalin data ke Google Sheets: ${errorText}`);
  }
}
