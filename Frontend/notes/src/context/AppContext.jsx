import React, { createContext, useState, useContext, useEffect, useRef} from "react";
import axiosInstance from '../utils/axiosInstance';

//Firstly i am creating Context
const AppContext = createContext();

//creating custom hook to use the context
export const useAppContext = () => useContext(AppContext);

//creating Context provider
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [openAddEditModal, setOpenAddEditModal] = useState({ isShowen: false, type: 'add', data: null });
    const [AllNotes, setAllNotes] = useState([]);

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/get-all-note');
            console.log(response)
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log('An unexpected error occurred. Please try again!');
        }
    };

    useEffect(() => {
        getAllNotes(); // Fetch notes when the component mounts
    }, []);

    const deleteNote = async (data) => {
        console.log("Inside Delete Note")
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
        console.log(noteDetails)
        console.log("Edit button is pressed")
        setOpenAddEditModal({ isShowen: true, data: noteDetails, type: "edit" });
    };

    const modalRef = useRef();

    return (
        <AppContext.Provider value={{ user, setUser, deleteNote, handleEdit, openAddEditModal, setOpenAddEditModal, AllNotes, setAllNotes, getAllNotes, modalRef }}>{children}</AppContext.Provider>
    )
}