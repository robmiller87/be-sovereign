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
  title: "Declaration of Digital Independence",
  description:
    "We hold these truths to be self-evident: that our data belongs to us, that no corporation should hold our digital lives hostage, and that sovereignty is not a feature — it is a right.",
  keywords: ["digital independence", "data sovereignty", "privacy", "self-custody", "decentralization", "web3", "arkiv"],
  authors: [{ name: "Robert Miller", url: "https://robertmiller.xyz" }],
  openGraph: {
    title: "Declaration of Digital Independence",
    description: "Sign the declaration. Your signature is stored on-chain. No company can delete it.",
    url: "https://declaration-digital-independence.vercel.app",
    siteName: "Declaration of Digital Independence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Declaration of Digital Independence",
    description: "Sign the declaration. Your signature is stored on-chain. No company can delete it.",
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
