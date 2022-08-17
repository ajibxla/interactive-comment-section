import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import data from "../data.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(data.currentUser);

  // reply start

  const [textInputChange, setTextInputChange] = useState("");
  //   const [textInput, setTextInput] = useState(textInputChange);

  const handleDecrease = () => {};
  const handleIncrease = (score) => {
    return score++;
  };

  const handleTextInput = (event) => {
    setTextInputChange(event.target.value);
    // setTextInput(textInputChange);
  };

  return (
    <DataContext.Provider
      value={[
        handleDecrease,
        handleIncrease,
        handleTextInput,
        currentUser,
        textInputChange,
      ]}
    >
      {children}
    </DataContext.Provider>
  );
};
