import { google } from 'googleapis';
import { auth } from './googleAuth';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

export async function getUserByPhone(phone: string) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Página1!A2:Z1000',
  });

  const rows = res.data.values || [];
  const header = rows[0];
  const user = rows.find(row => row.includes(phone));
  if (!user) return null;

  const result: Record<string, string> = {};
  header.forEach((key, idx) => result[key] = user[idx]);
  return result;
}

export async function updateUserData(email: string, updates: Record<string, string>) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Página1!A2:Z1000',
  });

  const rows = res.data.values || [];
  const header = rows[0];
  const rowIndex = rows.findIndex(row => row.includes(email));
  if (rowIndex === -1) return null;

  const requests = Object.entries(updates).map(([key, value]) => {
    const colIndex = header.indexOf(key);
    return {
      range: `Página1!${String.fromCharCode(65 + colIndex)}${rowIndex + 2}`,
      values: [[value]],
    };
  });

  await Promise.all(
    requests.map(({ range, values }) =>
      sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range,
        valueInputOption: 'RAW',
        requestBody: { values },
      })
    )
  );
  return true;
}
