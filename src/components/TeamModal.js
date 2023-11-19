import React, { useState } from 'react';

const TeamModal = ({ onSave, onClose }) => {
  const [teamName, setTeamName] = useState('');

  const handleSave = () => {
    onSave(teamName);
    setTeamName('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Enter Team Name</h2>
        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TeamModal;
