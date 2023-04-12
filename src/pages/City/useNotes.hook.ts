import { ChangeEvent, useEffect, useState } from "react";

import useCities from "pages/Cities/useCities.hook";
import {
  INote,
  addNote,
  deleteNote,
  setSelectedNote,
  updateNote,
} from "reducers/citiesSlice";
import { useAppDispatch, useAppSelector } from "reducers/hooks";

const useNotes = () => {
  const [text, setText] = useState("");

  const { savedNotes, selectedNote } = useAppSelector((state) => state.cities);
  const { dayjs } = useCities();

  useEffect(() => {
    if (selectedNote?.text) {
      setText(selectedNote.text);
    }
  }, [selectedNote]);

  const dispatch = useAppDispatch();

  const handleSaveNote = (note: INote) => {
    setText("");
    const noteExist = savedNotes.filter((not) => not.id === note.id);
    if (noteExist.length) {
      dispatch(updateNote(note));
    } else {
      dispatch(addNote(note));
    }
  };

  const getSelectedNote = (note: INote | null) => {
    dispatch(setSelectedNote(note));
    document.getElementById("notes")?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const handleDeleteNote = (note: INote) => dispatch(deleteNote(note));

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  return {
    text,
    dayjs,
    handleChange,
    savedNotes,
    selectedNote,
    handleSaveNote,
    getSelectedNote,
    handleDeleteNote,
  };
};

export default useNotes;
