import Autocomplete from "./Autocomplete";
import "./search.css"
const Search = () => {

  const fetchSuggestions = async(userInput) => {
    const response = await fetch("https://dummyjson.com/recipes/search?q="+userInput);
    if(!response.ok) { 
      throw new Error("Something went wrong");
    }
    const recipesList = await response.json();
    console.log("recipesList => ",recipesList.recipes);
    return recipesList.recipes;
  };
  return (<div className="main-autocomplete-container">
    <h1>Autocomplete/Typeahead</h1>
    <Autocomplete 
      placeholder={"Enter your text"}
      dataKey = {"name"}
      // staticData = {[]}
      fetchSuggestions={fetchSuggestions}
      onChange= {(input) => {}}
      onSelect= {(e) => {}}
      onBlur= {(e) => {}}
      onFocus= {(e) => {}}
      customStyle={{}}
      customLoading= {"Loading..."}
    />
  </div>)
};

export default Search;