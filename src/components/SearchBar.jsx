import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function SearchBar() {
  const { setSelectedUser } = useContext(UserContext); // ✅ fixed casing
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data.items || []))
        .catch((err) => console.log(err));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub User..."
        className="w-full p-2 border rounded-lg shadow"
      />

      {results.length > 0 && (
        <ul className="bg-white shadow rounded mt-2">
          {results.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setSelectedUser(user.login);
                setQuery("");
                setResults([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
