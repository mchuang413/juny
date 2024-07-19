import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Navbar className="w-full fixed top-0" />
          <main className="flex-1 p-4 mt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
