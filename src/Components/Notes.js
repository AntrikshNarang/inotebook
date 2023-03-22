import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { NoteItem } from './NoteItem';

export const Notes = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            // window.location.href = "/login"
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
    }
    const onChange = (e) => {
        setnote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Edit Note Form Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor=
                                        "etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor=
                                        "edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor=
                                        "etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription<5 || note.etitle<5} type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss='modal'>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1>Your Notes</h1>
                {!notes.length && 'No Notes to Display'}
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}
