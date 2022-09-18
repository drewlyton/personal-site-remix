import React from "react";

const Footer = () => {
  function copyEmail() {
    navigator.clipboard.writeText("drew@lumastic.com").then(
      function () {
        console.log("Copied successfully!");
        alert("Copied drew@lumastic.com to your clipboard!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
        alert(
          "Sorry! I couldn't copy my email to your clipboard. It's drew@lumastic.com"
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
        pb-3
        pt-2
        px-2
        wave-border
        top
        solid
      "
      >
        <div className="flex-grow flex items-center space-x-4">
          <div className="header-font leading-none uppercase">Find me on:</div>
          <a
            rel="noreferrer"
            href="https://twitter.com/itsjustdrewit"
            target="_blank"
          >
            <i className="bi bi-twitter"></i>
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
        </div>
        <div className="flex-grow-0">
          <button onClick={copyEmail}>
            <i className="bi bi-envelope-fill mr-1.5 mb-0.5"></i>
            Contact Me
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
