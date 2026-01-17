import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata = {
  title: "UzerSaif | Tour",
  description: "Tour",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} antialiased`}
        style={{ fontFamily: "'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
