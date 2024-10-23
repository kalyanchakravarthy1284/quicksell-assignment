import React from 'react';
import HighPriorityIcon from './assets/icons/Img - High Priority.svg';
import LowPriorityIcon from './assets/icons/Img - Low Priority.svg';
import MediumPriorityIcon from './assets/icons/Img - Medium Priority.svg';
import UrgentPriorityIcon from './assets/icons/SVG - Urgent Priority colour.svg';
import NoPriorityIcon from './assets/icons/No-priority.svg';

// Function to return the correct icon based on the priority
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 0: return NoPriorityIcon;
    case 1: return LowPriorityIcon;
    case 2: return MediumPriorityIcon;
    case 3: return HighPriorityIcon;
    case 4: return UrgentPriorityIcon;
    default: return NoPriorityIcon;
  }
};

const TicketCard = ({ ticket }) => {
  const { title, description, priority, user } = ticket;

  return (
    <div className="ticket-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="ticket-details">
        <div className="priority">
          <img src={getPriorityIcon(priority)} alt={`Priority ${priority}`} />
          Priority {priority}
        </div>
        <div className="user">
          Assigned to: {user ? user : 'Unassigned'}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;



