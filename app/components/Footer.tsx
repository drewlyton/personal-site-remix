import React from "react";
import ThemeSwitch from "./ThemeSwitch";

const Footer = () => {
  function copyEmail() {
    navigator.clipboard.writeText("contact@drewis.cool").then(
      function () {
        console.log("Copied successfully!");
        alert("Copied contact@drewis.cool to your clipboard!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
        alert(
          "Sorry! I couldn't copy my email to your clipboard. It's contact@drewis.cool"
        );
      }
    );
  }
  return (
    <footer className="px-4 bottom-0 fixed w-full z-50">
      <div
        className="
        box-border
        container
        mx-auto
        max-w-screen-lg
        flex
        items-center
        py-3
        px-2
        wave-border
        top
        solid
      "
      >
        <div className="flex-grow flex items-center space-x-4 max-md:space-x-6">
          <div className="header-font leading-none uppercase max-md:hidden">
            Let's Connect:
          </div>
          <a
            rel="noreferrer"
            href="https://twitter.com/itsjustdrewit"
            target="_blank"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            rel="noreferrer"
            href="https://www.youtube.com/c/Curiository"
            target="_blank"
          >
            <i className="bi bi-youtube"></i>
          </a>
          <a rel="noreferrer" href="https://github.com/aml3ed" target="_blank">
            <i className="bi bi-github"></i>
          </a>
          <button onClick={copyEmail} className="hover:text-ind">
            <i className="bi bi-envelope-fill"></i>
          </button>
        </div>
        <div className="flex-grow-0  mr-1.5 my-0.5">
          <ThemeSwitch />
          {/* <button onClick={copyEmail}>
            <i className="bi bi-envelope-fill mr-1.5 mb-0.5"></i>
            Contact Me
          </button> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
