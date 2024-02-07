import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  //Add Get Notes
  const getNote = async () => {
    //TODO:API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjNlMzU2NzM2MGE2ZmJjMDhlYWM4In0sImlhdCI6MTcwNjQ0NTgwNX0.80HxbpwxFPXjj0iiFnYPKuw1g5APgvc6yii3oZBJ3Bw",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add Notes
  const addNote = async (title, description, tag) => {
    //TODO:API Call
    const addFetch = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjNlMzU2NzM2MGE2ZmJjMDhlYWM4In0sImlhdCI6MTcwNjQ0NTgwNX0.80HxbpwxFPXjj0iiFnYPKuw1g5APgvc6yii3oZBJ3Bw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await addFetch.json();
    setNotes(notes.concat(json));
    // console.log(json);
  };

  //Delete Note
  const deleteNote = async (id) => {
    //TODO:API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjNlMzU2NzM2MGE2ZmJjMDhlYWM4In0sImlhdCI6MTcwNjQ0NTgwNX0.80HxbpwxFPXjj0iiFnYPKuw1g5APgvc6yii3oZBJ3Bw",
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("Deleteing note with id" + id);
    // const newNotes = notes.filter((note) => {
    //   return note._id !== id;
    // });
    // setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjNlMzU2NzM2MGE2ZmJjMDhlYWM4In0sImlhdCI6MTcwNjQ0NTgwNX0.80HxbpwxFPXjj0iiFnYPKuw1g5APgvc6yii3oZBJ3Bw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit in call
    let newNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
