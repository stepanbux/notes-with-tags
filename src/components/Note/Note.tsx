import React, { ChangeEvent, FC, useCallback, useState } from "react";

import { useAppDispatch } from "../../redux/redux-hooks";
import { addTag } from "../../redux/slice";
import { TypeOfNote } from "../../Types/types";

import s from "./Note.module.css";

interface Props {
  onClickRemove: (id: number) => void;
  handleSave: (data: TypeOfNote) => void;
  id: number;
  text: string;
}

export const Note: FC<Props> = ({ handleSave, onClickRemove, id, text }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  const onClickDelete = useCallback(() => {
    onClickRemove(id);
  }, [id, onClickRemove]);

  const onClickEdit = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const onClickSave = useCallback(() => {
    if (value.trim()) {
      handleSave({ id, text: value });
      setEditing(false);
      const matches = value.match(/#\w+/g);
      if (matches != null) {
        dispatch(addTag(matches));
      }
    }
  }, [value, handleSave, id, dispatch]);

  const onClickCancel = useCallback(() => {
    setValue(text);
    setEditing(false);
  }, [text, setValue, setEditing]);

  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );
  return (
    <div className={s.note_wrapper}>
      {editing ? (
        <>
          <textarea
            className={s.note_textarea}
            value={value}
            onChange={onChangeTextArea}
          />
          <div className={s.note_buttons_wrapper}>
            <button className={s.note_button} onClick={onClickSave}>
              Save
            </button>
            <button className={s.note_button} onClick={onClickCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={s.note_text}>{text}</span>
          <div className={s.note_buttons_wrapper}>
            <button onClick={onClickEdit} className={s.note_button}>
              Edit
            </button>
            <button onClick={onClickDelete} className={s.note_button}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
