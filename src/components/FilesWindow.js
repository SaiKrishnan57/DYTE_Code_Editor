import React, { useState } from "react";

export default function FilesWindow() {
  // Declare setOpen State
  const [open, setOpen] = useState(true);
  return (
    // FILE EXPLORER COMPONENT STARTS HERE
    <div className="file-container">
      <button type="button" className="html">
        index.html
      </button>
      <button type="button" className="css">
        index.css
      </button>
      <button type="button" className="js">
        index.js
      </button>
    </div>
    // FILE EXPLORER ENDS HERE
  );
}
