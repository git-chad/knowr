'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
