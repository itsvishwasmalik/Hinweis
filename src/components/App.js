import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

export default function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const localNotes = JSON.parse(localStorage.getItem("notes"));
        if (localNotes) {
            setNotes(localNotes);
        }
    }, []);

    function addNote(newNote) {
        setNotes((prevNotes) => {
            let updatedNotes = [...prevNotes, newNote];
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            let updatedNotes = prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            return updatedNotes;
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}
