import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Navbar className="w-64 fixed h-full" />
          <main className="flex-1 p-4 ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
