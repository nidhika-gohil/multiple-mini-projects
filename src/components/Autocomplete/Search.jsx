import { GET_RECIPES } from "../../util/constants";
import Autocomplete from "./Autocomplete";
import "./search.css"

const Search = () => {
  const fetchSuggestions = async(input) => {
    const response = await fetch(GET_RECIPES+"?q="+input);
    if (!response.ok) {
      throw new Error("Error fetching data from dummy api");
    }
    const recipesList = await response.json();
    return recipesList.recipes;
  };
  return(
    <div className="main-autocomplete-container">
      <h1>Autocomplete/Typeahed</h1>
      <Autocomplete
        placeholder={"Enter your text"}
        datakey={"name"}
        onChange={(input) => {}}
        onSelect={() => {}}
        onBlur={() => {}}
        onKeyup={() => {}}
        fetchSuggestions={fetchSuggestions}
      />
    </div>
  )
};

export default Search;