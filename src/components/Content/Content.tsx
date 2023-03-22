import React from "react";

import { Notes } from "../Notes/Notes";
import { SearchTag } from "../SearchTag/SearchTag";

import s from "./Content.module.css";

export const Content = () => {
  return (
    <div className={s.content_wrapper}>
      <Notes />
      <SearchTag />
    </div>
  );
};
