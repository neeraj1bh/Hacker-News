import React from "react";
import "./Footer.css";
import Logo from "../../heart.png";

export default function Footer() {
  return (
    <div>
      <p className="footer-heart">
        Made with{" "}
        <img className="emoji" alt="heart" height="20" width="20" src={Logo} />{" "}
        by <a href="https://www.neerajbhatt.live"> Neeraj Bhatt</a>
      </p>
    </div>
  );
}
