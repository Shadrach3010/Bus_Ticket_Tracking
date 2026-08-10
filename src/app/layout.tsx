import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real-Time Digital Bus Ticketing System",
  description:
    "A secure frontend for purchasing QR-code bus tickets, verifying tickets, and managing transport reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-slate-50 text-slate-900"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
