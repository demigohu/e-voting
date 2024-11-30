"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
// import { createAppKit } from '@reown/appkit/react'
// import { sepolia } from '@reown/appkit/networks'

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
// const metadata = {
//   name: 'appkit-example',
//   description: 'AppKit Example',
//   url: 'https://appkitexampleapp.com',
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// Create the modal
// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   networks: [sepolia],
//   defaultNetwork: sepolia,
//   metadata: metadata,
//   features: {
//     analytics: true
//   }
// })

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;