import React, { FormEvent, useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { setNewListOfNoutes } from "../../redux/slice";
import { TypeOfNote } from "../../Types/types";

import s from "./SearchTag.module.css";

export const SearchTag = () => {
  const dispatch = useAppDispatch();
  const [tag, setTag] = useState("");
  const listOfNotes: Array<TypeOfNote> = useAppSelector(
    (state) => state.mainReducer.listOfNotes
  );

  const onChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setTag(e.currentTarget.value);
    },
    [setTag]
  );

  const handleClick = useCallback(() => {
    const arr = [...listOfNotes];

    const regex = new RegExp(`${tag}\\b`);
    const filteredArr = arr.filter((item) => regex.test(item.text));
    const nonFilteredArr = arr.filter((item) => !regex.test(item.text));

    dispatch(setNewListOfNoutes([...filteredArr, ...nonFilteredArr]));
  }, [dispatch, listOfNotes, tag]);

  return (
    <div className={s.search_wrapper}>
      <span>Search note by tag</span>
      <div className={s.search_form}>
        <input
          onChange={onChange}
          className={s.search_input}
          placeholder="Enter the #tag"
          value={tag}
        />
        <button onClick={handleClick} className={s.search_button}>
          Search
        </button>
      </div>
    </div>
  );
};
