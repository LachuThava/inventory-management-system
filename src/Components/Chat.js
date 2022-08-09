import React, { useEffect } from "react";

function Chat() {

  useEffect(() => {
    window.location.href = "http://localhost:3001/";
  }, []);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

export default Chat;