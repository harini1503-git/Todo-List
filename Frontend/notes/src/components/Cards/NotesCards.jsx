import React, {useRef} from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useAppContext } from '../../context/AppContext'
import moment from 'moment';
import Draggable from 'react-draggable';
import AddEditNotes from '../../pages/Home/AddEditNotes';

const NotesCards = ({ note, checkboxChecked, onCheckboxChange }) => {
    const { handleEdit, deleteNote, modalRef, openAddEditModal, getAllNotes} = useAppContext();

    return (
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className='pinned'>
                                <h5 className="card-title">{note.title}</h5>
                            </div>
                            <span>{moment(note.date).format('MMMM DD YYYY, h:mm a')}</span>
                            <p className="card-text">{note.content}</p>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={checkboxChecked}
                                    onChange={onCheckboxChange}
                                />
                                <label className="form-check-label">
                                    Mark as done
                                </label>
                            </div>

                            <button type='submit' className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><MdEdit onClick={() => handleEdit(note)} /></button>
                            &nbsp; &nbsp;
                            <button type='submit' className="btn btn-danger"><MdDelete onClick={() => deleteNote(note)} /></button>

                        </div>
                    </div>
                </div>

            </div>


            
            <Draggable nodeRef={modalRef}>
                <div ref={modalRef} className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddEditNotes
                                    type={openAddEditModal.type}
                                    notedata={openAddEditModal.data}
                                    getAllNotes={getAllNotes} />
                            </div>
                        </div>
                    </div>
                </div>

            </Draggable>
        </div>
    )
}

export default NotesCards