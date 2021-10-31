import React, { FC, useState } from "react";

import { MainContext, contextDefaultValues } from ".";

export const ContextProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);

  const toggleLoading = (loading: boolean) => setLoading(!loading);

  return (
    <MainContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </MainContext.Provider>
  );
};
