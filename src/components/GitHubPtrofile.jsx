import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

function GitHubProfile() {
  const { selectedUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      fetch(`https://api.github.com/users/${selectedUser}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err));
    } else {
      setUser(null);
    }
  }, [selectedUser]);

  if (!selectedUser) return <p className="text-center mt-6">Search above 👆</p>;
  if (!user) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 rounded-2xl shadow-lg bg-white p-6 text-center">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-md"
      />
      <h2 className="text-2xl font-bold mt-4">{user.name || selectedUser}</h2>
      <p className="text-gray-500">@{user.login}</p>
      <div className="flex justify-around mt-6 text-gray-700">
        <div>
          <p className="font-bold text-lg">{user.followers}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div>
          <p className="font-bold text-lg">{user.following}</p>
          <p className="text-sm">Following</p>
        </div>
        <div>
          <p className="font-bold text-lg">{user.public_repos}</p>
          <p className="text-sm">Repos</p>
        </div>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Profile
      </a>
    </div>
  );
}

export default GitHubProfile;
