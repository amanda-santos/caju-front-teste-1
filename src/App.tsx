import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Toast from "@radix-ui/react-toast";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider duration={2000}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </Toast.Provider>
    </QueryClientProvider>
  );
};
