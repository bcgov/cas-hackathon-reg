import type { Metadata } from "next";
import Providers from "./components/Provider";

export const metadata: Metadata = {
  title: "Registration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
