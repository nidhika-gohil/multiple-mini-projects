const Suggestions = ({suggestions}) => {
  return suggestions.length > 0 ? (
    <div className="suggestions-list">
      {
        suggestions.map((suggestion)=> {
          return (
            <div key={suggestion.id}>{suggestion.name}</div>
          )
        })
      }
    </div>
  ) : (<></>)
};

export default Suggestions;