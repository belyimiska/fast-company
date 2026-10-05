import { createRoot } from "react-dom/client";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Не найден элемент с id="root"');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
