import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import StreamClientProvide from "../../providers/StreamClientProvide";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Call App",
  description: "A modern video calling application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-dark-1`}>
        <ClerkProvider>
          <StreamClientProvide>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </StreamClientProvide>
        </ClerkProvider>
      </body>
    </html>
  );
}
