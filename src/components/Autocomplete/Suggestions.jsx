const Suggestions = ({
  inputValue,
  datakey,
  suggestions,
  loading,
  loadingText,
  onSuggestionClick=()=>{}
  //error
}) => {

  const getHighlightedText = (text) => {
    const splittedText = text.split(new RegExp(`(${inputValue.toLowerCase()})`,"gi"));
    return(
      <div className="highlighted-text">
        {splittedText.map((text, index)=> {
          return (
            text.toLowerCase() === inputValue.toLowerCase() ? <b key={index}>{text}</b>: text
          )
        })}
      </div>
    );
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
  };

  return (
    suggestions.length > 0 ? (
      <>
        {
          suggestions.map((suggestion) => {
            return (
              <div className="suggestions" onClick={() => {
                handleSuggestionClick(suggestion[datakey])
              }} key={suggestion.id}>{getHighlightedText(suggestion[datakey])}</div>
            )
          })
        }
      </>
    ) : loading ? (
      <div className="suggestions loading-text">{loadingText}</div>
    ) : (null)
  );
};

export default Suggestions;