import React, { FC, useCallback } from "react";

import s from "./Tag.module.css";

interface Props {
  onClickRemove: (tag: string) => void;
  tag: string;
}

export const Tag: FC<Props> = ({ onClickRemove, tag }) => {
  const handleClick = useCallback(() => {
    onClickRemove(tag);
  }, [onClickRemove, tag]);

  return (
    <div className={s.tag_wrapper}>
      <span className={s.tag_text}>{tag}</span>
      <button onClick={handleClick} className={s.tag_button}>
        X
      </button>
    </div>
  );
};
