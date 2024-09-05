import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../../Interfae/Interfaces";
import { userConatct } from "../../utils/contatctData";
// contactsSlice.ts

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactList: userConatct,
  },
  reducers: {
    submitFormData: (state: any, action) => {
      const existingContactIndex = state.contactList.findIndex(
        (contact: any) => contact.id === action.payload.id
      );

      if (existingContactIndex >= 0) {
        // Update same contact
        state.contactList[existingContactIndex] = action.payload;
      } else {
        // Add new contact
        state.contactList.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.contactList = state.contactList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { submitFormData,removeItem } = contactSlice.actions;
export default contactSlice.reducer;
