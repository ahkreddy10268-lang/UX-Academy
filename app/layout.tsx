import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { Suspense } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { SiteFooter } from "@/components/shell/site-footer";
import { Topbar } from "@/components/shell/topbar";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "UX Academy", template: "%s · UX Academy" },
  description:
    "A personal, research-backed academy for the whole UX and UI discipline — theories, laws, methods, formulas and practice, connected.",
};

// Applied before paint so neither the theme nor the collapsed sidebar flashes.
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("ux-academy:theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(localStorage.getItem("ux-academy:sidebar")==="collapsed")d.setAttribute("data-sidebar","collapsed")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-3 z-50 rounded-sm bg-ink px-3 py-2 text-sm font-medium text-paper"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh">
          <Suspense fallback={null}>
            <Sidebar />
          </Suspense>
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main id="main" className="workspace flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
