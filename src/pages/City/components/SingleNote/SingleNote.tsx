import { Edit, Trash } from "react-feather";

import useNotes from "pages/City/useNotes.hook";
import { INote } from "types";
import "./SingleNote.styles.scss";

const SingleNote = (note: INote) => {
  const { getSelectedNote, handleDeleteNote } = useNotes();

  return (
    <div className="note">
      <p>{note.text}</p>
      <div className="controls">
        <h6>{note.date}</h6>
        <div className="right">
          <Edit
            className="icon icon-edit"
            onClick={() => getSelectedNote(note)}
          />
          <Trash
            className="icon icon-delete"
            onClick={() => handleDeleteNote(note)}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
