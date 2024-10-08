import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import LoanCalculator from "./components/LoanCalculator/LoanCalculator";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";

const embedElement = document.getElementById("loan-calculator-widget");

if (embedElement) {
  // If the 'loan-calculator-widget' element exists, render the LoanCalculator component as an embedded widget.
  const root = createRoot(embedElement);
  root.render(<LoanCalculator />);
} else {
  // If the 'loan-calculator-widget' element does not exist, render the full App as usual.
  const container = document.getElementById("app");
  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  );
}

/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "App";

// // Material Dashboard 2 PRO React Context Provider
// import { MaterialUIControllerProvider } from "context";

// const container = document.getElementById("app");
// const root = createRoot(container);

// root.render(
//   <BrowserRouter>
//     <MaterialUIControllerProvider>
//       <App />
//     </MaterialUIControllerProvider>
//   </BrowserRouter>
// );
