import React, { useState, useEffect } from 'react';
import { MdCreate } from 'react-icons/md';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import NotesCards from '../../components/Cards/NotesCards'; // Assuming NotesCard component exists
import AddEditNotes from './AddEditNotes'
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Home = () => {
  const { setUser} = useAppContext();

  const [AllNotes, setAllNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShowen: false, type: 'add', data: null });
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      console.log("inside getuserinfo")
      const response = await axiosInstance.get('/get-user')
        .then()
        .catch(err => {
          if (err.status === 404) navigate('/login');
          else console.log(err.status);
        });
      // console.log(response.data);
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-note');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again!');
    }
  };

  const toggleTaskStatus = (noteId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';


    setAllNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note =>
        note._id === noteId ? { ...note, status: newStatus } : note
      );
      console.log(updatedNotes);
      return updatedNotes;  // Ensure we return the updated state array
    });
    console.log(AllNotes);
    console.log(noteId)

    axiosInstance.put(`/edit-note/${noteId}`, { status: newStatus });
  };
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      console.log("Inside Delete note frontend")
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      console.log(response);
      if (response.data && !response.data.error) {
        getAllNotes(); // Refresh notes list after deletion
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occurred. Please try again!");
      }
    }
  };

  // Open modal for editing or adding a note
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShowen: true, data: noteDetails, type: "edit" });
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h4>Notes</h4>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pending-tab"
              data-bs-toggle="tab"
              data-bs-target="#pending"
              type="button"
              role="tab"
              onClick={() => setStatus("pending")}
              aria-controls="pending"
              aria-selected="true"
            >
              Pending
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="done-tab"
              data-bs-toggle="tab"
              data-bs-target="#done"
              type="button"
              role="tab"
              onClick={() => setStatus("done")}
              aria-controls="done"
              aria-selected="false"
            >
              Task Done
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
            <div className="container-main">
              {AllNotes.filter(note => note.status === status).map((item) => (
                <NotesCards
                  key={item._id}
                  title={item.title}
                  date={moment(item.createdOn).format('DD MMM YYYY')}
                  content={item.content}
                  checkboxChecked={status === 'done'}
                  onCheckboxChange={() => { toggleTaskStatus(item._id, item.status) }}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-circle btn-xl"
          onClick={() => setOpenAddEditModal({ isShowen: true, type: 'add', data: null })}
        >
          <MdCreate size={30} />
        </button>
      </div>

      <Modal
        isOpen={openAddEditModal.isShowen}
        onRequestClose={() => setOpenAddEditModal({ isShowen: false, type: 'add', data: null })}
        style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.2)' } }}
        contentLabel="Add or Edit Note"
        className="custom-class"
      >
        <AddEditNotes
          onclose={() => setOpenAddEditModal({ isShowen: false, type: 'add', data: null })}
          type={openAddEditModal.type}
          notedata={openAddEditModal.data}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
