import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import { PropsWithChildren, ReactElement } from "react";
import theme from "../ui/theme/theme";
import { queryClientOptions } from "./queryClientOptions";

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient(queryClientOptions);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export const renderComponent = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });
