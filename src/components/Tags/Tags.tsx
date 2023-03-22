import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { setNewTags } from "../../redux/slice";
import { Tag } from "../Tag/Tag";

import s from "./Tags.module.css";

export const Tags = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.mainReducer.tags);

  const onClickRemove = useCallback(
    (tag: string) => {
      dispatch(setNewTags(tags.filter((item) => item !== tag)));
    },
    [dispatch, tags]
  );

  return (
    <div className={s.tags_wrapper}>
      {tags.map((tag, index) => {
        return <Tag onClickRemove={onClickRemove} key={index} tag={tag} />;
      })}
    </div>
  );
};
