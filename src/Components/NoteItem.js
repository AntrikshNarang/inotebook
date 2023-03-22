import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context;
    return (
        <>

            <div className="card col-md-3 mx-3 my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid mx-1 fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid mx-1 fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}
