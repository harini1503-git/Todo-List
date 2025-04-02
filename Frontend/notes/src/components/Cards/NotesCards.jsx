import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useAppContext } from '../../context/AppContext'
import moment from 'moment';

const NotesCards = ({ note, checkboxChecked, onCheckboxChange }) => {
    const { handleEdit, deleteNote}= useAppContext();
    
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

                            <button type='submit' className="btn btn-primary"><MdEdit onClick={()=>handleEdit(note)} /></button>
                            &nbsp; &nbsp;
                            <button type='submit' className="btn btn-danger"><MdDelete onClick={()=>deleteNote(note)} /></button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotesCards