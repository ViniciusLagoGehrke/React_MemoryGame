import React from "react";
// import { StoreProvider } from "./utils/store";
import Layout from "./components/Layout";
import Game from "./components/Game";

function App() {
  return (
    <Layout>
      {/* <StoreProvider> */}
      <Game />
      {/* </StoreProvider> */}
    </Layout>
  );
}

export default App;
