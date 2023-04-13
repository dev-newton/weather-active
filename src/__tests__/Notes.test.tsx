import "whatwg-fetch";
import { setupStore } from "store";
import {
  addNote,
  deleteNote,
  setSelectedNote,
  updateNote,
} from "reducers/citiesSlice";
import { INote } from "types";

describe("Notes", () => {
  it("should be empty initially", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    expect(cities.savedNotes.length).toBe(0);
  });

  it("should add 4 notes successfully", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    expect(cities.savedNotes.length).toBe(0);
    store.dispatch(
      addNote({ id: 1, city: "lagos", text: "Testing1", date: "21/01/2023" })
    );
    store.dispatch(
      addNote({ id: 2, city: "lagos", text: "Testing2", date: "22/01/2023" })
    );
    store.dispatch(
      addNote({ id: 3, city: "tokyo", text: "Testing3", date: "31/01/2023" })
    );
    store.dispatch(
      addNote({ id: 4, city: "lagos", text: "Testing4", date: "24/01/2023" })
    );

    cities = store.getState().cities;
    expect(cities.savedNotes.length).toBe(4);
  });

  it("should filter notes by city successfully", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    const city = "lagos";

    store.dispatch(
      addNote({ id: 1, city: "lagos", text: "Testing1", date: "21/01/2023" })
    );
    store.dispatch(
      addNote({ id: 2, city: "berlin", text: "Testing2", date: "22/01/2023" })
    );
    store.dispatch(
      addNote({ id: 3, city: "tokyo", text: "Testing3", date: "31/01/2023" })
    );
    store.dispatch(
      addNote({ id: 4, city: "lagos", text: "Testing4", date: "24/01/2023" })
    );

    cities = store.getState().cities;
    const notes = cities.savedNotes.filter(
      (note: INote) => note.city?.toLowerCase() === city?.toLowerCase()
    );
    expect(notes.length).toBe(2);
  });

  it("should delete notes successfully", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    expect(cities.savedNotes.length).toBe(0);
    store.dispatch(
      addNote({ id: 2, city: "berlin", text: "Testing2", date: "22/01/2023" })
    );
    store.dispatch(
      addNote({ id: 3, city: "tokyo", text: "Testing3", date: "31/01/2023" })
    );
    store.dispatch(
      addNote({ id: 4, city: "lagos", text: "Testing4", date: "24/01/2023" })
    );

    cities = store.getState().cities;
    expect(cities.savedNotes.length).toBe(3);
    store.dispatch(
      deleteNote({ id: 2, city: "lagos", text: "Testing2", date: "22/01/2023" })
    );
    store.dispatch(
      deleteNote({ id: 3, city: "tokyo", text: "Testing3", date: "31/01/2023" })
    );
    cities = store.getState().cities;
    expect(cities.savedNotes.length).toBe(1);
  });

  it("should read a note successfully", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    expect(cities.savedNotes.length).toBe(0);
    store.dispatch(
      setSelectedNote({
        id: 1,
        city: "Cairo",
        text: "Testing Selected Note",
        date: "21/01/2023",
      })
    );

    cities = store.getState().cities;
    expect(cities.selectedNote?.text).toEqual("Testing Selected Note");
    expect(cities.selectedNote?.text).toContain("Note");
    expect(cities.selectedNote?.city).not.toEqual("Ciaro");
    expect(cities.selectedNote?.date).toEqual("21/01/2023");
  });

  it("should update a note successfully", async () => {
    const store = setupStore();
    let cities = store.getState().cities;

    expect(cities.savedNotes.length).toBe(0);
    store.dispatch(
      addNote({ id: 1, city: "lagos", text: "Testing1", date: "21/01/2023" })
    );
    store.dispatch(
      addNote({ id: 2, city: "berlin", text: "Testing2", date: "22/01/2023" })
    );
    store.dispatch(
      addNote({ id: 3, city: "tokyo", text: "Testing3", date: "31/01/2023" })
    );

    cities = store.getState().cities;
    expect(cities.savedNotes.length).toBe(3);
    store.dispatch(
      setSelectedNote({
        id: 2,
        city: "berlin",
        text: "Testing2",
        date: "22/01/2023",
      })
    );

    cities = store.getState().cities;
    expect(cities.selectedNote?.city).toBe("berlin");
    store.dispatch(
      updateNote({
        id: 2,
        city: "amsterdam",
        text: "Testing2",
        date: "22/01/2023",
      })
    );

    cities = store.getState().cities;
    expect(cities.savedNotes[1]?.city).toBe("amsterdam");
  });
});
