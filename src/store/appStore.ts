import { createContext } from "solid-js";

interface User {
  readonly id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
}

const AppContext = createContext<
  [
    AppState,
    {
      setUser: (user: User | null) => void;
      setLoading: (val: boolean) => void;
    }
  ]
>();

export { AppContext, type User, type AppState };
