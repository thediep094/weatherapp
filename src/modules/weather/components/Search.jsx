import React, { useState } from "react";
import Icons from "../../../components/Icons";
import { useDispatch } from "react-redux";
import { convertTextTV } from "../../../services/api/convertTextTV";
const locationList = [
  {
    id: 1581130,
    text: "Hà Nội",
    value: {
      lat: 21.028511,
      lon: 105.804817,
    },
  },
  {
    id: 1566083,
    text: "TP.Hồ Chí Minh",
    value: {
      lat: 10.762622,
      lon: 106.660172,
    },
  },
  {
    id: 1580240,
    text: "Huế",
    value: {
      lat: 16.463713,
      lon: 107.590866,
    },
  },
];
const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const submit = () => {
    const find = locationList.find((location) => {
      return convertTextTV(location.text).includes(input);
    });

    if (find) {
      dispatch({
        type: "FETCH_WEATHER",
        payload: {
          id: find.id,
        },
      });
    }
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
