import { useEffect, useState } from "react";

import Button from "components/Button/Button";
import SingleNote from "../SingleNote/SingleNote";
import useNotes from "pages/City/useNotes.hook";
import { INote } from "types";
import "./Notes.styles.scss";

interface INotes {
  city: INote["city"];
  selectedNote?: INote | null;
  savedNotes: INote[];
}

const Notes = ({ city, savedNotes }: INotes) => {
  const [cityNotes, setCityNotes] = useState<INote[]>([]);

  const {
    dayjs,
    text,
    handleChange,
    handleSaveNote,
    selectedNote,
    getSelectedNote,
  } = useNotes();

  useEffect(() => {
    const notes = savedNotes.filter(
      (note: INote) => note.city?.toLowerCase() === city?.toLowerCase()
    );
    setCityNotes(notes);
  }, [savedNotes, city]);

  const data = {
    id: selectedNote?.id || Date.now(),
    city,
    text,
    date: dayjs(Date.now()).format("LLL"),
  };

  return (
    <div className="notes">
      <textarea
        className="textarea"
        placeholder="Enter a note..."
        rows={3}
        value={text}
        onChange={handleChange}
      ></textarea>
      <Button
        label="SAVE NOTE"
        onClick={() => {
          handleSaveNote(data);
          getSelectedNote(null);
        }}
        disabled={!text.length}
      />
      <div className="notes-wrapper">
        <h3>{cityNotes.length} note(s):</h3>
        <div className="notes-list">
          {[...cityNotes].reverse().map((note) => (
            <SingleNote
              key={note.id}
              id={note.id}
              text={note.text}
              date={note.date}
              city={note.city}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
