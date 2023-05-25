import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="grid grid-cols-6">
          <div className="h-full row-span-2">
            <Sidebar />
          </div>
          <div className="h-[15vh] col-span-5 ">
            <Navbar />
          </div>
          <div className="h-[85vh] col-span-5">{children}</div>
        </main>
      </body>
    </html>
  );
}
