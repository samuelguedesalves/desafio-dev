import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "./hooks/useAuth";

import { GlobalStyles } from "./styles/global";

const App: React.FC = () => (
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    <GlobalStyles />
  </>
);

export default App;
