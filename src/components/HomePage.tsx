import React, { useState } from 'react';
import './HomePage.css';

interface array_data {
  name: string;
}

function HomePage() {
  const [input, setInput] = useState<string>('');
  const [array_data, setArray_data] = useState<array_data[]>([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editIndex !== null) {
      // If in edit mode, update the item
      const updatedArray = [...array_data];
      updatedArray[editIndex] = { name: input };
      setArray_data(updatedArray);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Otherwise, add a new item
      setArray_data([...array_data, { name: input }]);
    }
    setInput('');
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setInput(array_data[index].name);
  };

  const handleDelete = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const updatedArray = array_data.filter((_, i) => i !== index);
    setArray_data(updatedArray);
  };

  return (
    <div className="mainDiv">
      <div>
        <h3>HomePage</h3>
      </div>
      <div>
        <form onSubmit={handleInput}>
          <input
            type="text"
            className="input_div"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
      </div>

      <div>
        {array_data.map((data, index) => (
          <div key={index}>
            <ul>
              <li>
                <strong>{index + 1}.</strong> {data.name}&nbsp;
                <button onClick={() => handleEdit(index)}>Edit</button>&nbsp;
                <button onClick={(e) => handleDelete(index, e)}>Delete</button>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div>
        <button className="close-button" onClick={() => setShow(!show)}>
        auto select
        </button>
      </div>
      <div className="answer-section">
        <h3>Your answer</h3>
        {show && (
          <h3>{array_data[Math.floor(Math.random() * array_data.length)]?.name}</h3>
        )}
      </div>
    </div>
  );
}

export default HomePage;
