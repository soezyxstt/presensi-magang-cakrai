import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from '~/components/ui/sonner';

export const metadata: Metadata = {
  title: "Magang KRAI 2024",
  description: "Built by Adi a.k.a Soezyxst",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gradient-to-br from-pink-400 via-violet-400 to-cyan-400">
        <div className="bg-muted/5 min-h-dvh w-full">
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
