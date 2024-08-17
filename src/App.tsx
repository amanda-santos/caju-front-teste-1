import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </QueryClientProvider>
  );
};
