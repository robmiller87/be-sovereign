"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / About</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">CREDITS</h2>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Created By */}
        <div className="col-span-2">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Created By</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://robertmiller.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors"
              >
                Robert Miller
              </a>
            </li>
            <li className="font-mono text-xs text-muted-foreground/60">
              Web3 builder since 2017
            </li>
            <li className="font-mono text-xs text-muted-foreground/60">
              Built at Network School
            </li>
          </ul>
        </div>

        {/* Powered By */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Powered By</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://arkiv.network" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors"
              >
                Arkiv
              </a>
            </li>
            <li>
              <a 
                href="https://golem.network" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors"
              >
                Golem Network
              </a>
            </li>
          </ul>
        </div>

        {/* Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Stack</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Next.js</li>
            <li className="font-mono text-xs text-foreground/80">Tailwind CSS</li>
            <li className="font-mono text-xs text-foreground/80">Vercel</li>
          </ul>
        </div>

        {/* Connect */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://x.com/rob_miller87"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Twitter/X
              </a>
            </li>
            <li>
              <a
                href="https://warpcast.com/robmiller87"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Farcaster
              </a>
            </li>
          </ul>
        </div>

        {/* Year */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Year</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">2026</li>
            <li className="font-mono text-xs text-foreground/80">Ongoing</li>
          </ul>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="mt-24 pt-12 border-t border-border/20">
        <div className="max-w-2xl">
          <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight mb-6">WHY THIS MATTERS</h3>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
            We built the internet to connect us. Somewhere along the way, we became the product.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
            Every photo you've uploaded, every message you've sent, every search you've made — 
            stored on servers you don't control, governed by terms you didn't read, 
            owned by companies that can disappear tomorrow.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            This declaration isn't nostalgia for a decentralized past. 
            It's a commitment to a sovereign future.
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Declaration of Digital Independence. Open source.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">
          Data stored on Arkiv. Immutable. Uncensorable. Yours.
        </p>
      </div>
    </section>
  )
}
