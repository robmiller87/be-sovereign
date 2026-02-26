import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "Be Sovereign — Own Your Digital Life",
  description:
    "We gave our data to big tech. Now we choose sovereignty. Sign the declaration. Your signature is stored on-chain — permanent, uncensorable, yours.",
  keywords: ["sovereignty", "data sovereignty", "privacy", "self-custody", "decentralization", "web3", "arkiv", "digital independence"],
  authors: [{ name: "Robert Miller", url: "https://robertmiller.xyz" }],
  openGraph: {
    title: "Be Sovereign — Own Your Digital Life",
    description: "We gave our data to big tech. Now we choose sovereignty. Sign on-chain.",
    url: "https://besovereign.xyz",
    siteName: "Be Sovereign",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be Sovereign — Own Your Digital Life",
    description: "We gave our data to big tech. Now we choose sovereignty. Sign on-chain.",
    creator: "@rob_miller87",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
