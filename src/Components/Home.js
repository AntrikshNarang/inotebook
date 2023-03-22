import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import { Notes } from './Notes';


export default function Home() {
    return (
        <>
            <AddNote />
            <Notes />
        </>
    )
}
