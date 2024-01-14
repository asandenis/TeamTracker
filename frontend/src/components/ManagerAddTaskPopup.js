import React, { useState } from 'react';
import './TaskDetailsPopup.css';
import axios from 'axios';


const ManagerAddTaskPopup = ({ onClose }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'High',
    status: 'PENDING',
    user_id: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9000/api/manager/addtask', task)
      .then(response => {
        if (response.status === 200) {
          console.log('Task adaugat cu succes!');
        }
        onClose();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="task-details-popup">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={task.title} onChange={handleInputChange} />
          </label>
          <label>
            User id:
            <input type="text" name="user_id" value={task.user_id} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name='description' value={task.description} onChange={handleInputChange} />
          </label>
          <label>
            Due Date:
            <input type="date" name='due_date' value={task.due_date} onChange={handleInputChange} />
          </label>
          <label>
            Priority:
            <select name='priority' value={task.priority} onChange={handleInputChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <p>Status: {task.status}</p>
          <button type='submit'>Submit</button>
          <button type='button' onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerAddTaskPopup;