import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../logo.png";

const Header = ({ setQuery }) => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  let name = currentUser.email.substring(0, currentUser.email.lastIndexOf("@"));
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to Log Out");
    }
  }
  return (
    <div className="header">
      <div className="header1">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="user">{name}</div>
      </div>
      <div className="header2">
        <input
          className="searchBox"
          type="text"
          placeholder=" Enter something to search... "
          onChange={(e) => {
            e.persist();
            setTimeout(() => {
              setQuery(e.target.value);
            }, 2000);
          }}
        />
        <button className="searchButton" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Header;
