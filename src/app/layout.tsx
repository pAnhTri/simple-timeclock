import type { Metadata } from "next";
<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time Clock",
  description: "Time Clock",
=======
import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata: Metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
>>>>>>> origin/postgres-refactor
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
=======
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript suppressHydrationWarning />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
>>>>>>> origin/postgres-refactor
      </body>
    </html>
  );
}
