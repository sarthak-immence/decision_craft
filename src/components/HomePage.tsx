import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem, resetItem } from '../redux/master/slices/masterSlices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface array_data {
  name: string;
}


function HomePage() {

  const [input, setInput] = useState<string>('');
  const array_data = useSelector((state: { array_data: array_data[] }) => state.array_data);

  // const [show, setShow] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showAutoSelectPopup, setShowAutoSelectPopup] = useState(false);
  const [autoSelectAnswer, setAutoSelectAnswer] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add state to control button's disabled state

  const dispatch = useDispatch();

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      return;
    }

    const isDuplicate = array_data.some((item) => item.name.toLowerCase() === trimmedInput.toLowerCase());

    if (isDuplicate) {
      setIsButtonDisabled(true);
      toast.error("This name is already in the list.");
      setTimeout(() => {
        setIsButtonDisabled(false); // Enable the button after 2000ms (2 seconds)
      }, 3000);
      return;
    }

    if (isEditing && editIndex !== null) {
      setIsEditing(false);
      dispatch(editItem({ index: editIndex, newName: input }));
    } else {
      dispatch(addItem(trimmedInput));
    }
    setInput('');
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setInput(array_data[index].name);
    dispatch(editItem({ index: index, newName: input }));
  };

  // const handleEdit = (index: number) => {
  //   setIsEditing(true);
  //   setEditIndex(index);
  //   setInput(array_data[index].name);
  // };


  const handleDelete = (index: number) => {
    dispatch(deleteItem({ index: index }));
  };

  // const handleRandomSelect = () => {
  //   if (array_data.length) {
  //     const randomIndex = Math.floor(Math.random() * array_data.length);
  //     setInput(array_data[randomIndex].name);
  //     setAuto_select("show")
  //   }
  // };
  const handleReset = () => {
    // if(array_data.length){
    //   const randomIndex = Math.floor(Math.random() * array_data.length);
    //   setInput(array_data[randomIndex].name);
    // }
    dispatch(resetItem());
    setInput('')
  };

  const handleRandomSelect = () => {
    if (array_data.length) {
      const randomIndex = Math.floor(Math.random() * array_data.length);
      setAutoSelectAnswer(array_data[randomIndex].name);
      setShowAutoSelectPopup(true);
    }
  };
  const handleCloseAutoSelectPopup = () => {
    setShowAutoSelectPopup(false);
  };
  return (
    <div className="mainDivContainer">
      <div className="mainDiv">
        <div className='title_cls'>
          <Typography variant="h3">Decision Craft</Typography>
        </div>
        <div className='input-section'>
          <form onSubmit={handleInput}>
            <TextField
              type="text"
              className="input_div custom-input"
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
              label="Enter a name"
              // label={<span style={{ color: 'white' }}>Enter a name</span>}
              sx={{
                '& label': {
                  color: 'white', // Apply red color to the label
                },

              }}
              variant="outlined"
            />
            <Button
              className='submit_bttn'
              type="submit"
              variant="contained"
              color="primary"
              disabled={isButtonDisabled}
            >
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </form>
        </div>
        <div className='list-section'>
          <div className="list-container">
            <List>
              {array_data.map((data, index) => (
                <ListItem key={index}>
                   <ListItemText
        primary={
          <Typography>
            <strong>{index + 1}.</strong> {data.name}
          </Typography>
        }
       
      />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(index)}
                      className='icon_button'
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      className='icon_button'
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
        </div>
        <div className='gnt-section'>
          <Button
            className="auto_select-button"
            variant="contained"
            color="secondary"
            onClick={handleRandomSelect}
          >
            auto select
          </Button>
          <Button
            className="auto_select-button"
            variant="contained"
            color="primary"
            onClick={handleReset}
          >
            reset
          </Button>
        </div>
        {/* <div className="answer-section">
        {auto_select==="show" && (
          <>
            <Typography variant="h6">Your answer</Typography>
            <Typography variant="body1" className='answer_output'>
              {input}
            </Typography>
          </>
        )}
      </div> */}
        <ToastContainer position="top-center" autoClose={2000} limit={1} max-count={1} />
        <Dialog
          open={showAutoSelectPopup}
          onClose={handleCloseAutoSelectPopup}
          aria-labelledby="auto-select-dialog-title"
        >
          <DialogTitle id="auto-select-dialog-title">Auto-Selected Answer</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{autoSelectAnswer}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAutoSelectPopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default HomePage;
