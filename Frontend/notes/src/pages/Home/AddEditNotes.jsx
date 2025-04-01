import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ notedata, getAllNotes, type, onclose }) => {
  const [title, setTitle] = useState(notedata?.title || "");
  const [content, setContent] = useState(notedata?.content || "");
  const [Error, setError] = useState(null);

  // Add a new note (POST request)
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", { title, content });
      console.log(response);
      if (response.data && response.data.note) {
        getAllNotes();
        onclose();
      }
    } catch (Error) {
      if (Error.response && Error.response.data && Error.response.data.message) {
        setError(Error.response.data.message);
      } else {
        setError("An Error occurred while adding the note.");
      }
    }
  };

  // Edit an existing note (PUT request)
  const editNote = async () => {
    const noteId = notedata._id;
    // console.log(noteId);
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, { title, content });
      console.log(response);
      if (response.data && response.data.note) {
        getAllNotes();
        onclose();
      }
    } catch (Error) {
      console.Error("Error during edit note operation:", Error);  // Log full Error to inspect
      setError("An Error occurred while editing the note.");
    }
  };

  // Handle adding or editing a note
  const handleAddNote = () => {
    if (!title) {
      setError("Please add a title for your task.");
      return;
    }
    if (!content) {
      setError("Please add content for your task.");
      return;
    }

    setError(""); // Clear Error if validation passes

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div>
      <button type="button" className="close" aria-label="Close" onClick={onclose}>
        <MdClose />
      </button>

      <div className="form-group">
        <label htmlFor="noteTitle">Title</label>
        <input
          type="text"
          className="form-control"
          id="noteTitle"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="noteContent">Content</label>
        <textarea
          className="form-control"
          id="noteContent"
          placeholder="Content"
          rows={5}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {Error && <p style={{ color: 'red' }}>{Error}</p>}

      <button type="button" className="btn btn-primary btn-set" onClick={handleAddNote}>
        {type === "edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
