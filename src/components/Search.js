import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import axios from 'axios';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [genders, setGenders] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [searchItem, setSearchItem] = useState('');

  const getUserData = async () => {
    const response = await axios.get("https://heliverse-assignment-ipit.onrender.com/api/users");
    const userData = response.data;
    setUsers(userData);
    setFilteredUsers(userData);

    // Extract unique domains, genders, and availabilities
    const uniqueDomains = [...new Set(userData.map(user => user.domain))];
    const uniqueGenders = [...new Set(userData.map(user => user.gender))];
    const uniqueAvailabilities = [...new Set(userData.map(user => user.availability))];

    setDomains(['All', ...uniqueDomains]);
    setGenders(['All', ...uniqueGenders]);
    setAvailabilities(['All', ...uniqueAvailabilities]);
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = filterUsers(selectedDomain, selectedGender, selectedAvailability, searchTerm);
    setFilteredUsers(filteredItems);
  }

  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setSelectedDomain(selectedDomain);

    const filteredUsers = filterUsers(selectedDomain, selectedGender, selectedAvailability, searchItem);
    setFilteredUsers(filteredUsers);
  }

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setSelectedGender(selectedGender);

    const filteredUsers = filterUsers(selectedDomain, selectedGender, selectedAvailability, searchItem);
    setFilteredUsers(filteredUsers);
  }

  const handleAvailabilityChange = (e) => {
    const selectedAvailability = e.target.value;
    setSelectedAvailability(selectedAvailability);

    const filteredUsers = filterUsers(selectedDomain, selectedGender, selectedAvailability, searchItem);
    setFilteredUsers(filteredUsers);
  }

  const filterUsers = (domain, gender, availability, searchTerm) => {
    return users.filter(user =>
      (domain === 'All' || user.domain === domain) &&
      (gender === 'All' || user.gender === gender) &&
      (availability === 'All' || user.availability === availability) &&
      (searchTerm === '' || user.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  return (
    <>
      <div className='container d-flex flex-row my-3 '>
        <select className="btn btn-secondary dropdown-toggle mx-1" aria-label="Default select example" onChange={handleDomainChange} value={selectedDomain}>
          <option value='All'>All Domains</option>
          {domains.map((domain, index) => (
            <option key={index} value={domain}>{domain}</option>
          ))}
        </select>
        <select className="btn btn-secondary dropdown-toggle mx-1" aria-label="Default select example" onChange={handleGenderChange} value={selectedGender}>
          <option value='All'>All Genders</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>{gender}</option>
          ))}
        </select>
        <select className="btn btn-secondary dropdown-toggle mx-1" aria-label="Default select example" onChange={handleAvailabilityChange} value={selectedAvailability}>
          <option value='All'>All Availabilities</option>
          {availabilities.map((availability, index) => (
            <option key={index} value={availability==true?"Available":"Not Available"}>{availability==true?"Available":"Not Available"}</option>
          ))}
        </select>
        <input type='search' className="form-control" value={searchItem} onChange={handleInputChange} id="exampleDataList" placeholder="Type to search..." />
        <button type="button" className="btn btn-primary">Search</button>
      </div>
      <UserList users={filteredUsers} />
    </>
  )
}

export default Search;
