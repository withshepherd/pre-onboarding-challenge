import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import GqlProvider from "./apolloClient";

export const metadata = {
  title: "My Shepherd Warm Up",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <GqlProvider>{children}</GqlProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
