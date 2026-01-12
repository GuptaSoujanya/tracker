"use client";
import React, { useEffect, useState } from "react";


const page = () => {
  const [response, setResponse] = useState<string>("");
  useEffect (() => {
    fetch('http://localhost:5000/api/health')
      .then((response) => response.json())
      .then((data) => setResponse(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);
  return <div>
  Response: {response}
  </div>;

};

export default page;