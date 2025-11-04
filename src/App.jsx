import React from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Calendar</h1>
        <p className="app-subtitle">Stay organized and never miss an event</p>
      </header>
      <main className="app-main">
        <Calendar />
      </main>
    </div>
  );
}

export default App;