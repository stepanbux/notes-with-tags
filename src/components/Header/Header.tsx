import React, { ChangeEvent, useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { addNote, addTag } from "../../redux/slice";
import { TypeOfNote } from "../../Types/types";

import s from "./Header.module.css";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState("");
  const listOfNotes: Array<TypeOfNote> = useAppSelector(
    (state) => state.mainReducer.listOfNotes
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setNote(e.currentTarget.value);
    },
    [setNote]
  );

  const createNote = useCallback(() => {
    return {
      id: listOfNotes.length,
      text: note,
    };
  }, [listOfNotes.length, note]);

  const handleClick = useCallback(() => {
    if (note.trim()) {
      dispatch(addNote(createNote()));
      const matches = note.match(/#\w+/g);
      if (matches != null) {
        dispatch(addTag(matches));
      }
      setNote("");
    }
  }, [createNote, dispatch, note, setNote]);

  return (
    <div className={s.header_wrapper}>
      <textarea
        value={note}
        className={s.header_textarea}
        onChange={onChange}
        placeholder="Enter the some text"
      />
      <button onClick={handleClick} className={s.header_button}>
        Save
      </button>
    </div>
  );
};
