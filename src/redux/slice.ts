import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { TypeOfNote } from "../Types/types";

const noutesSlice = createSlice({
  name: "noutesList",
  initialState: {
    listOfNotes: [] as TypeOfNote[],
    tags: [] as string[],
  },
  reducers: {
    addNote(state, action: PayloadAction<TypeOfNote>) {
      state.listOfNotes.push(action.payload);
    },
    addTag(state, action: PayloadAction<string[]>) {
      const lastArray = state.tags;
      state.tags = _.uniq(lastArray.concat(action.payload));
    },
    setNewListOfNoutes(state, action) {
      state.listOfNotes = action.payload;
    },
    setNewTags(state, action) {
      state.tags = action.payload;
    },
    editNote(state, action: PayloadAction<TypeOfNote>) {
      const newArray = [...state.listOfNotes];
      newArray.forEach((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
      });
      state.listOfNotes = newArray;
    },
  },
});

export const { addNote, addTag, setNewListOfNoutes, setNewTags, editNote } =
  noutesSlice.actions;

export default noutesSlice.reducer;
