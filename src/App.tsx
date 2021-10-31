import React from "react";
import { ContextProvider } from "./context/ContextProvider";
import Layout from "./components/Layout";
import Game from "./components/Game";

function App() {
  return (
    <Layout>
      <ContextProvider>
        <Game />
      </ContextProvider>
    </Layout>
  );
}

export default App;
