import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  title: "Knowr",
  description: "Your design database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
