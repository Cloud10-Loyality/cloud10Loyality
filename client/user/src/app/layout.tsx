import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Container from "@/components/container/Container";
import { ThemeProvider } from "next-themes";
import AppProvider from "@/Redux/AppProvider";

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
      <body className="dark:bg-slate-700">
        <AppProvider>
          <Container type="dashboard">
            <Sidebar />
            <Navbar />
            <div className="h-[85vh]  ">{children}</div>
          </Container>
        </AppProvider>
      </body>
    </html>
  );
}
