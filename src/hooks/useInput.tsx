import React, { useState } from "react";

const useInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const resetInput = () => setInputValue("");

  const input = <input value={inputValue} onChange={handleInputChange} />;

  return { inputValue, input, resetInput };
};

export default useInput;
