import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 Webhooks do Chatbot Moveo</h1>
      <p>Este projeto disponibiliza 3 webhooks:</p>
      <ul>
        <li><strong>/api/user-data</strong>: Consulta dados no Google Sheets</li>
        <li><strong>/api/user-calendar</strong>: Consulta compromissos no Google Calendar</li>
        <li><strong>/api/update-data</strong>: Interpreta pedidos de alteração</li>
      </ul>
      <p>Use o Postman ou Insomnia para testar as rotas.</p>
    </main>
  );
}
