import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Repos() {
  const { selectedUser } = useContext(UserContext);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    fetch(`https://api.github.com/users/${selectedUser}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setRepos([]);
        setLoading(false);
      });
  }, [selectedUser]);
  if (!selectedUser) return null;
  if (loading)
    return (
      <p className="text-center mt-4 text-gray-600 font-medium">
        Loading repositories...
      </p>
    );
  if (!repos.length)
    return (
      <p className="text-center mt-4 text-gray-600 font-medium">
        No repositories found.
      </p>
    );
  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
        {selectedUser}'s Repositories
      </h3>
      <ul className="divide-y divide-gray-200">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-3 hover:bg-gray-50 rounded-lg transition flex justify-between items-center"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline text-sm sm:text-base"
            >
              {repo.name}
            </a>
            <span className="text-gray-500 text-xs sm:text-sm">
              ⭐ {repo.stargazers_count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repos;
