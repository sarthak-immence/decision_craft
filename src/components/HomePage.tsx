import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../redux/master/slices/masterSlices';

interface array_data {
  name: string;
}

function HomePage() {
  const [input, setInput] = useState<string>('');
  // const array_data = useSelector((state: array_data[]) => state);
  // const array_data = useSelector((state:array_data[]) => state.array_data);
  const array_data = useSelector((state: { array_data: array_data[] }) => state.array_data);

  console.log("array_data",array_data);
  
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      return;
    }

    const isDuplicate = array_data.some((item) => item.name.toLowerCase() === trimmedInput.toLowerCase());

    if (isDuplicate) {
      alert("This name is already in the list.");
      return;
    }

    if (isEditing && editIndex !== null) {
      dispatch(editItem({ index: editIndex , newName:input}));
    } else {
      dispatch(addItem(trimmedInput));
    }
    setInput('');
  };

  // const handleEdit = (index: number) => {
  //   setIsEditing(true);
  //   setEditIndex(index);
  //   setInput(array_data[index].name);
  //   dispatch(editItem({ index: index }));
  // };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setInput(array_data[index].name);
  };
  


  const handleDelete = (index: number) => {
    dispatch(deleteItem({ index: index }));
  };

  return (
    <div className="mainDiv">
      <div className='title_cls'>
        <Typography variant="h3">HomePage</Typography>
      </div>
      <div className='input-section'>
        <form onSubmit={handleInput}>
          <TextField
            type="text"
            className="input_div"
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            label="Enter a name"
            variant="outlined"
          />
          <Button
            className='submit_bttn'
            type="submit"
            variant="contained"
            color="primary"
          >
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>

      <div className='list-section'>
        <List>
          {array_data.map((data, index) => (
            <ListItem key={index}>
              <ListItemText>
                <strong>{index + 1}.</strong> {data.name}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(index)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <div className='gnt-section'>
        <Button
          className="auto_select-button"
          variant="contained"
          color="success"
          onClick={() => setShow(!show)}
        >
          auto select
        </Button>
      </div>
      <div className="answer-section">
        <Typography variant="h6">Your answer</Typography>
        {show && (
          <Typography variant="body1">
            {array_data[Math.floor(Math.random() * array_data.length)]?.name}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default HomePage;
