import React, { useState } from "react";
import Icons from "../../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { convertTextTV } from "../../../services/api/convertTextTV";
import { Alert } from "@mui/material";

const Search = () => {
  const [input, setInput] = useState("");
  const currentType = useSelector((state) => state.weather.currentType);
  const dispatch = useDispatch();
  const submit = () => {
    dispatch({
      type: "FETCH_WEATHER",
      payload: {
        q: input,
      },
      style: currentType,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default action (e.g., form submission)
      handleEnter();
    }
  };

  const handleEnter = () => {
    submit();
  };
  return (
    <div className="search">
      <div className="search-wrapper">
        <input
          type="text"
          value={input}
          placeholder="Search for city"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={() => submit()}>
          <Icons name={"search"} />
        </button>
      </div>
    </div>
  );
};

export default Search;
