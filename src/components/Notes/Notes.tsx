import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { editNote, setNewListOfNoutes } from "../../redux/slice";
import { TypeOfNote } from "../../Types/types";
import { Note } from "../Note/Note";

import s from "./Notes.module.css";

export const Notes = () => {
  const dispatch = useAppDispatch();
  const listOfNotes: Array<TypeOfNote> = useAppSelector(
    (state) => state.mainReducer.listOfNotes
  );

  const onClickRemove = useCallback(
    (id: number) => {
      dispatch(
        setNewListOfNoutes(listOfNotes.filter((item) => item.id !== id))
      );
    },
    [dispatch, listOfNotes]
  );

  const handleSave = useCallback(
    (data: TypeOfNote) => {
      dispatch(editNote(data));
    },
    [dispatch]
  );

  return (
    <div className={s.notes_wrapper}>
      {listOfNotes.map((item) => (
        <Note
          key={item.id}
          onClickRemove={onClickRemove}
          handleSave={handleSave}
          id={item.id}
          text={item.text}
        />
      ))}
    </div>
  );
};
