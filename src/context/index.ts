import { createContext } from "react";

export type ContextTypes = {
  loading: boolean;
  toggleLoading: (loading: boolean) => void;
};

export const contextDefaultValues: ContextTypes = {
  loading: true,
  toggleLoading: () => {},
};

export const MainContext = createContext<ContextTypes>(contextDefaultValues);