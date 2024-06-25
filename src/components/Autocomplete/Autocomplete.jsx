import { useEffect, useRef, useState } from "react";
import Suggestions from "./Suggestions";
import useDebounce from "./customHook/useDebounce";

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
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionRefs = useRef([]);
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

  const handlKeyUp = (e) => {
    if(e.key === "Enter" && activeSuggestionIndex > -1) {
      onSuggestionClick(suggestions[activeSuggestionIndex][datakey]);
    } else if(e.key === "ArrowUp") {
      setActiveSuggestionIndex((prev) => {
        const newIndex = prev === 0 ? suggestions.length - 1 : prev - 1;
        scrollInView(newIndex);
        return newIndex;
      });
    } else if(e.key === "ArrowDown") {
      setActiveSuggestionIndex((prev) => {
        const newIndex = prev === suggestions.length - 1 ? 0 : prev + 1;
        scrollInView(newIndex);
        return newIndex;
      });
    }
  };

  const scrollInView = (index)=> {
    if (suggestionRefs.current[index]) {
      suggestionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  const getDebouncedFunction = useDebounce(getSuggestions, 500);

  useEffect(() => {
    if(inputValue.length > 1 && !suggestionClicked) {
      getDebouncedFunction(inputValue);
    } else {
      setSuggestionClicked(false);
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
        onKeyUp={handlKeyUp}
      />
      <div className="suggestions-list">
        <Suggestions
          inputValue={inputValue}
          datakey={datakey}
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
          loading={loading}
          loadingText={"Loading..."}
          activeSuggestionIndex={activeSuggestionIndex}
          suggestionRefs={suggestionRefs}
          // error={error}
        />
      </div>
    </div>
  );
};

export default Autocomplete;