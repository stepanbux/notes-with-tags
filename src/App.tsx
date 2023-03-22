import React from "react";

import { Content } from "./components/Content/Content";
import { Header } from "./components/Header/Header";
import { Tags } from "./components/Tags/Tags";

import s from "./App.module.css";

function App() {
  return (
    <div className={s.app_wrapper}>
      <Header />
      <Content />
      <Tags />
    </div>
  );
}

export default App;
