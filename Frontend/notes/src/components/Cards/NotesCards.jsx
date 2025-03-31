import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const NotesCards = ({ title, date, content, onEdit, onDelete }) => {
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
                            <button type='submit' className="btn btn-primary"><MdEdit onChange={onEdit} /></button>
                            &nbsp; &nbsp;
                            <button type='submit' className="btn btn-danger"><MdDelete onChange={onDelete} /></button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotesCards