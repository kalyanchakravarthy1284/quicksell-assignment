import React from 'react';
import KanbanBoard from './components/KanbanBoard'; // Import the Kanban Board component
import './App.css'; // Import the styles
import TicketCard from './Components/TicketCard';
function App() {
  return (
    <div className="App">
      <KanbanBoard /> {/* Render the Kanban Board */}
    </div>
  );
}

export default App;
