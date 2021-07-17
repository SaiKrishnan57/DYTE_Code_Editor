import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import querystring from "querystring";
import axios from "axios";

function App() {
  /** This is a description of the saveData function which lets you create a unique link using the PasteBin API */
  // srcDoc contains the complete html document to be saved and rendered
  var saveData = () => {
    var url = "";
    var data = querystring.stringify({
      // Enter API DEV KEY
      api_dev_key: "QTZjAZYi8m9j4gpr5mV1zQOtGVCxAWe-",
      api_option: "paste",
      api_paste_code: srcDoc,
    });
    var config = {
      method: "post",
      // Using a CORS-Anywhere proxy server hosted in Heroku
      url: "https://fierce-dusk-10679.herokuapp.com/https://pastebin.com/api/api_post.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    // POST Request to CREATE a paste in pastebin and return response url
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        url = JSON.stringify(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // if url is empty return error
    if (url === "") {
      url = "maximum paste in 24h limit reached";
    }
    alert(url);
  };

  // useLocalStorage to save html,css,js code to local storage .
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  // Declare state variable
  const [srcDoc, setSrcDoc] = useState("");
  const [open, setOpen] = useState(true);
  const [lang, setLanguage] = useState("xml");

  // HotReload feature to reload contents of iframe every 250ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  // Main Application Starts
  return (
    <>
      {/* START OF TOP SECTION */}
      <div className="pane top-pane">
        {/* FILE EXPLORER STARTS HERE */}
        <div className={`file-container ${open ? "" : "collapsed"}`}>
          <div className="editor-title">
            File Explorer
            <button
              type="button"
              className="file-collapse-btn"
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            </button>
          </div>
          {/*index.html , index.js, index.css files*/}
          <button
            type="button"
            className="html"
            onClick={() => setLanguage("xml")}
          >
            index.html
          </button>
          <button
            type="button"
            className="css"
            onClick={() => setLanguage("css")}
          >
            index.css
          </button>
          <button
            type="button"
            className="js"
            onClick={() => setLanguage("javascript")}
          >
            index.js
          </button>
          <button
            type="button"
            className="save-code"
            onClick={() => saveData()}
          >
            SAVE CODE
          </button>
        </div>
        {/* FILE EXPLORER ENDS HERE */}

        {/* CODE EDITOR STARTS HERE */}
        <Editor
          language={lang}
          displayName={lang === "xml" ? "HTML" : lang === "css" ? "CSS" : "JS"}
          value={lang === "xml" ? html : lang === "css" ? css : js}
          onChange={lang === "xml" ? setHtml : lang === "css" ? setCss : setJs}
        />
        {/* CODE EDITOR ENDS HERE */}
      </div>
      {/* END FOR TOP SECTION */}
      {/* LIVE SECTION STARTS HERE */}
      <div className="live-view-title">Live View</div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      {/* LIVE SECTION ENDS HERE */}
    </>
  );
}

export default App;
