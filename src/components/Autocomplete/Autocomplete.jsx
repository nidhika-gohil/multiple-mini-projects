import { useEffect, useState } from "react";
import Suggestions from "./Suggestions";

const Autocomplete = ({
  placeholder="Text",
  datakey="name",
  staticData=[],
  onChange=(input) => {},
  onSelect=() => {},
  onBlur=() => {},
  onKeyup=()=>{},
  fetchSuggestions
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const handlOnChange = (e) =>{
    let targetValue = e.target.value;
    setInputValue(targetValue);
    onChange(targetValue);
  };

  const getSuggestions = async() =>{
    let result = [];
    setLoading(true);
    if(staticData && staticData.length > 0) {
      // return data from staticData which matched
    } else if(fetchSuggestions) {
      try {
        result = await fetchSuggestions(inputValue);
        setSuggestions(result);
      } catch(err) {
        setSuggestions(result);
        // setError("Error");
        console.log("Error fetching the suggestions");
      } finally {
        setLoading(false);
      }
    }
  };

  const onSuggestionClick = (suggestion) =>{
    setInputValue(suggestion);
    setSuggestions([]);
    setSuggestionClicked(true);
    setLoading(false);
  };

  useEffect(() => {
    if(inputValue.length > 1 && !suggestionClicked) {
      getSuggestions();
    } else {
      setSuggestions([]);
    }
  },[inputValue]);

  return (
    <div className="container">
      <input value={inputValue}
        placeholder={placeholder}
        onChange={handlOnChange}
        onSelect={onSelect}
        onBlur={onBlur}
      />
      <div className="suggestions-list">
        <Suggestions
          inputValue={inputValue}
          datakey={datakey}
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
          loading={loading}
          loadingText={"Loading..."}
          // error={error}
        />
      </div>
    </div>
  );
};

export default Autocomplete;