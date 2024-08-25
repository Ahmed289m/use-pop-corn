import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import RatingStars from "./components/RatingStars";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/*<RatingStars maxRating={5} />*/}
  </React.StrictMode>
);
