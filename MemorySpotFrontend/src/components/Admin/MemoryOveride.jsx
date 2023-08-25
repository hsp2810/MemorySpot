
import React, { useState } from 'react';
import { memories } from '../../services/tempData';
import '../../assets/css/adminCss/memoryOverride.css';



const MemoryOveride = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [editedMemory, setEditedMemory] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectMemory = (memory) => {
    setSelectedMemory(memory);
    setEditedMemory({ ...memory });
  };

  const handleEditField = (event) => {
    setEditedMemory({ ...editedMemory, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    const updatedMemories = memories.map((memory) => {
      if (memory === selectedMemory) {
        return { ...editedMemory };
      }
      return memory;
    });
    const index = updatedMemories.findIndex((memory) => memory === selectedMemory);
    updatedMemories[index].lat = editedMemory.latitude;
    updatedMemories[index].lng = editedMemory.longitude;
    memories = updatedMemories;
    setSelectedMemory(null);
    setEditedMemory(null);
  };

  const handleWatch = () => {
    // Implement the logic to watch the selected memory here
  };

  const handleDelete = () => {
    const index = memories.findIndex((memory) => memory === selectedMemory);
    memories.splice(index, 1);
    setSelectedMemory(null);
    setEditedMemory(null);
  };

  const filteredMemories = memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search memories" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredMemories.map((memory) => (
          <li key={memory.title} onClick={() => handleSelectMemory(memory)}>
            {memory.title} ({memory.owner})
          </li>
        ))}
      </ul>
      {selectedMemory && (
        <div>
          <h2>{selectedMemory.title}</h2>
          <img src={selectedMemory.image} alt={selectedMemory.title} />
          <p>{selectedMemory.description}</p>
          <p>Latitude: {selectedMemory.lat}</p>
          <p>Longitude: {selectedMemory.lng}</p>
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" name="longitude" value={editedMemory.longitude} onChange={handleEditField} className="Longitude" />
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" name="latitude" value={editedMemory.latitude} onChange={handleEditField} className="Latitude" />
          <button onClick={handleSave} className="blue">Save</button>
          <button onClick={handleWatch} className="green">Watch</button>
          <button onClick={handleDelete} className="red">Delete</button>
        </div>
      )}
    </div>
  );
};

export default MemoryOveride;
