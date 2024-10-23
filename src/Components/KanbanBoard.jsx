import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayOptions from './DisplayOptions';
import TicketCard from './TicketCard';
import ToDoIcon from './assets/icons/To-do.svg';
import InProgressIcon from './assets/icons/in-progress.svg';
import DoneIcon from './assets/icons/Done.svg';
import BacklogIcon from './assets/icons/Backlog.svg';
import CancelledIcon from './assets/icons/Cancelled.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Default group by status

  // Fetching tickets from the API
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => setTickets(response.data.tickets))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Group tickets by selected option
  const groupTickets = (tickets, groupBy) => {
    switch (groupBy) {
      case 'status':
        return groupByField(tickets, 'status');
      case 'user':
        return groupByField(tickets, 'userId');
      case 'priority':
        return groupByField(tickets, 'priority');
      default:
        return tickets;
    }
  };

  // Helper function to group tickets by a field
  const groupByField = (tickets, field) => {
    const groups = tickets.reduce((acc, ticket) => {
      const group = ticket[field] || 'Uncategorized';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(ticket);
      return acc;
    }, {});
    return groups;
  };

  // Group the tickets
  const groupedTickets = groupTickets(tickets, groupBy);

  return (
    <div>
      {/* Separate div for the DisplayOptions at the top */}
      <div className="display-options-container">
        <DisplayOptions setGroupBy={setGroupBy} />
      </div>

      {/* Separate div for the Kanban board columns */}
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="column">
            <h4>
              {/* Icons for status */}
              {group === 'To Do' && <><img src={ToDoIcon} alt="To Do" /> To Do</>}
              {group === 'In Progress' && <><img src={InProgressIcon} alt="In Progress" /> In Progress</>}
              {group === 'Done' && <><img src={DoneIcon} alt="Done" /> Done</>}
              {group === 'Backlog' && <><img src={BacklogIcon} alt="Backlog" /> Backlog</>}
              {group === 'Cancelled' && <><img src={CancelledIcon} alt="Cancelled" /> Cancelled</>}

              {/* Handle priority names */}
              {groupBy === 'priority' && (
                <>
                  {group === '0' && 'No Priority'}
                  {group === '1' && 'Low Priority'}
                  {group === '2' && 'Medium Priority'}
                  {group === '3' && 'High Priority'}
                  {group === '4' && 'Urgent Priority'}
                </>
              )}

              {/* Handle users */}
              {groupBy === 'user' && (
                <span>Assigned to: {group}</span>
              )}

              {/* Ticket count */}
              <span> ({groupedTickets[group].length} tickets)</span>
            </h4>

            {groupedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

