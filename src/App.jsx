import "./App.css";
import Card from "./components/Card";
import GitHubProfile from "./components/GitHubPtrofile";
import Repos from "./components/Repos";
import SearchBar from "./components/SearchBar";
import { UserProvider, UserContext } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          GitHub user Finder
        </h1>
        {/* in this Search bar component will be placed  */}
        <SearchBar />
        {/* in this github profile will be placed */}
        <GitHubProfile />
        {/* this is for rendering git repos  */}
        <Repos />
      </div>
    </UserProvider>
  );
}

export default App;
