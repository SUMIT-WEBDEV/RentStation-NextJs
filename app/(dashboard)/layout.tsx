import MobileFooter from "@/components/ui/mobile-footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import Navbar from "./_components/navbar";
// import "./globals.css";
// import { db } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const users = await db.user.find();

  // console.log(users);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <Navbar />
        {children}
        {/* </ThemeProvider> */}
        <MobileFooter />
      </body>
    </html>
  );
}
