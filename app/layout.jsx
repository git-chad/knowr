import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import Navbar from "@/components/ui/navbar";

export const metadata = {
  title: "Knowr",
  description: "Your design database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} scrollbar-hide`}>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
