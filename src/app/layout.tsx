import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import { DialogsProvider } from '@toolpad/core/useDialogs';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body className={roboto.variable}>
        <DialogsProvider >
          <AppRouterCacheProvider>
            +           <ThemeProvider theme={theme}>
              {children}
              +           </ThemeProvider>
          </AppRouterCacheProvider>
        </DialogsProvider>
      </body>
    </html>
  );
}
