import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import RootState from "./rootstate";

const font = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Login OKR",
  description: "Fenri Mintardja",
  icons: {
    icon: "/images/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RootState>{children}</RootState>
      </body>
    </html>
  );
}
