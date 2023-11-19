import React, { useState } from 'react';
import Card from './Card';
import Pagination from './Pagination';

const UserList = (props) => {
  const { users } = props;
  const usersPerPage = 20; // Number of users to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [team, setTeam] = useState([]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const saveTeam = (teamName) => {
    // Save team details to MongoDB (you need to implement the API call)
    const teamDetails = {
      teamName,
      members: team.map((user) => ({ id: user.id, name: `${user.first_name} ${user.last_name}`, domain: user.domain })),
    };
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.includes(userId);
  
      if (isSelected) {
        // If the user is already selected, remove them from the list
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        // If the user is not selected, add them to the list
        return [...prevSelectedUsers, userId];
      }
    });
  };
  

  const createTeam = () => {
  // Filter users based on the selected user IDs
  const teamUsers = users.filter((user) => selectedUsers.includes(user.id));

  // Update the team state
  setTeam(teamUsers);

  // Reset selected users
  setSelectedUsers([]);
  openModal();
};

  

  return (
    <div className='container'>
      <div className="text-left mb-3">
        <button className="btn btn-primary" onClick={createTeam} disabled={selectedUsers.length === 0}>
          Create Team
        </button>
      </div>
      <div className="row">
        {paginatedUsers.map((user) => (
          <div className="col-sm-4 my-3" key={user.id}>
            <Card
              email={user.email}
              status={user.available}
              domain={user.domain}
              username={user.first_name + " " + user.last_name}
              imgUrl={user.avatar}
              onCheckboxChange={() => handleCheckboxChange(user.id)}
              isChecked={selectedUsers.includes(user.id)}
            />
          </div>
        ))}
      </div>
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
      
      {/* Display the team information */}
      {team.length > 0 && (
        <div className="mt-3">
          <h2 className="text-center">Team Information</h2>
          <ul>
            {team.map((teamUser) => (
              <li key={teamUser.id}>{teamUser.first_name} {teamUser.last_name} - {teamUser.domain}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserList;
