import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import NotesCards from '../../components/Cards/NotesCards';
import { MdCreate, MdDelete } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import moment from "moment";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShowen: false, type: "add", data: null });
  const [user, setuser] = useState(null);
  const [AllNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  // Fetch user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setuser(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error);
      }
    }
  };

  // Fetch all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-note");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again!");
    }
  };

  // Delete a note
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

  // Effect hook to fetch user info and all notes when the component mounts
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <NavBar userinfo={user} />
      <h4>Notes Cards</h4>
      <div className='container-main'>
        {AllNotes.map((item) => (
          <NotesCards
            key={item._id}
            title={item.title}
            date={moment(item.createdOn).format('DD MMM YYYY')}
            content={item.content}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
          />
        ))}
      </div>

      <Modal
        isOpen={openAddEditModal.isShowen}
        onRequestClose={() => setOpenAddEditModal({ isShowen: false, type: "add", data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel="Add or Edit Note"
        className="custom-class"
      >
        <AddEditNotes
          onclose={() => {
            setOpenAddEditModal({ isShowen: false, type: "add", data: null })}
          }
          type={openAddEditModal.type}
          notedata={openAddEditModal.data}
          getAllNotes={getAllNotes}
        />
      </Modal>

      <button
        type="button"
        className="btn btn-primary btn-circle btn-xl"
        onClick={() => setOpenAddEditModal({ isShowen: true, type: "add", data: null })}
      >
        <MdCreate size={30} />
      </button>
    </>
  );
};

export default Home;
