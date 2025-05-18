import { google } from 'googleapis';
import { auth } from './googleAuth';

export async function getCalendarEvents(email: string) {
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.list({
    calendarId: email,
    timeMin: new Date().toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = res.data.items || [];
  if (!events.length) return 'Nenhum evento encontrado.';

  return events.map(event => {
    const start = event.start?.dateTime || event.start?.date;
    return `- **${event.summary}** em ${start}`;
  }).join('\n');
}
