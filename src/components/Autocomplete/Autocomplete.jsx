import {useEffect, useState} from "react";
import Suggestions from "./Suggestions";

const Autocomplete = ({
  placeholder="Enter your text",
  dataKey = "name",
  staticData = [],
  fetchSuggestions,
  onChange= () => {},
  onSelect=  () => {},
  onBlur=  () => {},
  onFocus=  () => {},
  customStyle,
  customLoading
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [suggestionList, setSuggestionList] = useState([]);
  const handleOnInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async() => {
    setLoading(true);
    setError(false);
    let list;
    try { 
      if (staticData.length > 0) {
      } else if(fetchSuggestions) {
        list = await fetchSuggestions(inputValue);
      }
      console.log("list => ",list);
      setSuggestionList(list);
    } catch(err) {
      setError("Failed to fetch the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(inputValue.length > 1) {
      getSuggestions();
    }
  },[inputValue]);
  return (
    <div className="container">
      <input 
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnInputChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={customStyle}
      />
      <Suggestions suggestions={suggestionList}/>
    </div>
  )  
};

export default Autocomplete;