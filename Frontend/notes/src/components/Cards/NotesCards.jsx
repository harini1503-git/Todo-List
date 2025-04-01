import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useAppContext } from '../../context/AppContext'

const NotesCards = ({ title, date, content, onEdit, onDelete, checkboxChecked, onCheckboxChange }) => {
    
    return (
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className='pinned'>
                                <h5 className="card-title">{title}</h5>
                            </div>
                            <span>{date}</span>
                            <p className="card-text">{content}</p>
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

                            <button type='submit' className="btn btn-primary"><MdEdit onClick={onEdit} /></button>
                            &nbsp; &nbsp;
                            <button type='submit' className="btn btn-danger"><MdDelete onClick={onDelete} /></button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotesCards