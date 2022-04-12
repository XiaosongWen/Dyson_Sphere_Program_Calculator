import React from 'react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {createRoot, Root} from "react-dom/client";

const container = document.getElementById('root');
let root: Root;
root = createRoot(container as Element);
root.render (
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);