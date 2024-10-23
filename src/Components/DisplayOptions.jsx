import React, { useState } from 'react';
import DisplayIcon from './assets/icons/Display.svg';
import DownIcon from './assets/icons/down.svg';

const DisplayOptions = ({ setGroupBy }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="display-wrapper">
      <button className="display-button" onClick={toggleDropdown}>
        <img src={DisplayIcon} alt="Display" />
        Display <img src={DownIcon} alt="Down Arrow" />
      </button>

      {isDropdownVisible && (
        <div className="dropdown-menu">
          <div className="dropdown-option">
            <label>Grouping</label>
            <select onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
