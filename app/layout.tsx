import type { Metadata } from "next";
import { onest } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: 'Waza - %s',
    default: 'Waza'
  },
  description: "The cutest dev! >.<"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}