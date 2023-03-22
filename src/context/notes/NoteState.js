import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [
        {
            "_id": "63e7eds663d534c3ad1f2117f",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "firstnote",
            "description": "This is the Description",
            "tag": "personal",
            "date": "2023-02-11T19:32:54.862Z",
            "__v": 0
        },
        {
            "_id": "63e7ed673d534fc3ad1f21181",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "firstnote",
            "description": "This is the Description",
            "tag": "personal",
            "date": "2023-02-11T19:32:55.688Z",
            "__v": 0
        },
        {
            "_id": "63e8df07e2sa2fd8d5500dca8d",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "harry on fire",
            "description": "code with harry",
            "tag": "youtube",
            "date": "2023-02-12T12:43:51.121Z",
            "__v": 0
        },
        {
            "_id": "63e8df07e2da2fd85500dca8d",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "harry on fire",
            "description": "code with harry",
            "tag": "youtube",
            "date": "2023-02-12T12:43:51.121Z",
            "__v": 0
        },
        {
            "_id": "63e8dfs07e2a2fd85500dca8d",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "harry on fire",
            "description": "code with harry",
            "tag": "youtube",
            "date": "2023-02-12T12:43:51.121Z",
            "__v": 0
        },
        {
            "_id": "63e8df07e2a2fd855a00dca8d",
            "user": "63e4d2a26035b3cf30a8224b",
            "title": "harry on fire",
            "description": "code with harry",
            "tag": "youtube",
            "date": "2023-02-12T12:43:51.121Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(initialNotes)


    //Get all Notes
    const getNotes = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          const json = await response.json();
         setnotes(json)
    }
    
    
    //Add a Note
    const addNote = async (title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const note= await response.json();
          
        //Logic to edit in client
        //concat returns an array whereas push updates the array
        setnotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id)=>{
 console.log(id)
         //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          const json= await response.json();
          console.log(json)
        
        const newNotes = notes.filter((note)=>(note._id!==id))
        setnotes(newNotes)
    }
    //Edit a Note
    const editNote = async (id,title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json= await response.json();
          console.log(json)
          
        //Logic to edit in client

        let newNotes = JSON.parse(JSON.stringify(notes));
         for (let index = 0; index < newNotes.length; index++) {
            if(newNotes[index]._id === id){
                newNotes[index].title = title; 
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
         }
         setnotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;