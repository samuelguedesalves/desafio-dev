import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "./hooks/useAuth";
import { ShopsProvide } from "./hooks/useShops";

import { GlobalStyles } from "./styles/global";

const App: React.FC = () => (
  <>
    <AuthProvider>
      <ShopsProvide>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ShopsProvide>
    </AuthProvider>

    <GlobalStyles />
  </>
);

export default App;
