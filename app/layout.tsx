import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "./_components/navbar";
import MobileFooter from "@/components/ui/mobile-footer";
import Sidebar from "./_components/account-sidebar";
import DesktopFooter from "./_components/footer/desktop-footer";
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentStation",
  description: "A user to user rental platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <div className="pb-24 lg:pb-2 overflow-hidden bg-slate-50">
            <Navbar />
            <Sidebar />
            {children}
            {/* </ThemeProvider> */}
          </div>
          <MobileFooter />
          <DesktopFooter />
          <Script src="/service-worker.js" />
        </body>
      </html>
    </SessionProvider>
  );
}
