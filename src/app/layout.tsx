import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/sonner";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { SparklesCore } from "~/components/ui/sparkles";

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
        <div className="relative min-h-dvh w-full max-w-[100vw] overflow-x-hidden bg-muted/5">
          <div className="pointer-events-none absolute inset-0 h-dvh max-h-dvh w-full">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
          </div>
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
          <Link
            href="https://github.com/soezyxstt"
            className="fixed z-10 right-4 top-[calc(100dvh-2.5rem)] flex items-center gap-2 rounded-xl border border-white bg-black/20 px-3 py-1 text-xs text-white backdrop-blur-sm"
          >
            Web by Adi <FiGithub />
          </Link>
        </div>
      </body>
    </html>
  );
}
