import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const handleCounterStore = (action) => {
    switch (action) {
      case "GOOD":
        store.dispatch({ type: "GOOD" });
        break;
      case "OK":
        store.dispatch({ type: "OK" });
        break;
      case "BAD":
        store.dispatch({ type: "BAD" });
        break;
      case "ZERO":
        store.dispatch({ type: "ZERO" });
        break;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => handleCounterStore("GOOD")}>good</button>
      <button onClick={() => handleCounterStore("OK")}>ok</button>
      <button onClick={() => handleCounterStore("BAD")}>bad</button>
      <button onClick={() => handleCounterStore("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
