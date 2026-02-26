"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Signature {
  id: string
  name: string
  message?: string
  timestamp: string
  signerWallet?: string
  txHash?: string
}

export function SignSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const signaturesRef = useRef<HTMLDivElement>(null)

  const [signatures, setSignatures] = useState<Signature[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Load signatures on mount
  useEffect(() => {
    loadSignatures()
    checkWallet()
  }, [])

  const checkWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_accounts",
        })
        if (accounts.length > 0) {
          setWalletConnected(true)
          setWalletAddress(accounts[0])
        }
      } catch (err) {
        console.error("Error checking wallet:", err)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length > 0) {
          setWalletConnected(true)
          setWalletAddress(accounts[0])
        }
      } catch (err) {
        console.error("Error connecting wallet:", err)
      }
    } else {
      alert("No wallet detected. You can still sign without a wallet.")
    }
  }

  const loadSignatures = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/signatures")
      const data = await res.json()
      if (data.ok) {
        setSignatures(data.signatures || [])
      }
    } catch (error) {
      console.error("Error loading signatures:", error)
    } finally {
      setLoading(false)
    }
  }

  const submitSignature = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      setSubmitting(true)
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim() || undefined,
          signerWallet: walletAddress || undefined,
        }),
      })
      const data = await res.json()

      if (data.ok) {
        setName("")
        setMessage("")
        setTimeout(loadSignatures, 2000)
        alert("Your signature has been recorded on-chain. Thank you for signing the Declaration!")
      } else {
        alert("Error: " + (data.error || "Failed to submit"))
      }
    } catch (error) {
      console.error("Error submitting signature:", error)
      alert("Error submitting signature")
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sign" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Take Action</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">JOIN THE MOVEMENT</h2>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-[var(--font-bebas)] text-6xl md:text-8xl text-accent">{signatures.length}</span>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {signatures.length === 1 ? "Signatory" : "Signatories"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Sign Form */}
        <div>
          <form ref={formRef} onSubmit={submitSignature} className="space-y-6">
            {/* Wallet Connection */}
            <div className="flex justify-between items-center pb-4 border-b border-border/30">
              {walletConnected ? (
                <span className="font-mono text-xs text-accent">
                  ✓ Wallet: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                >
                  Connect Wallet (Optional)
                </button>
              )}
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-transparent border border-border/50 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                disabled={submitting}
                required
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                Your Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Why are you signing?"
                rows={3}
                className="w-full px-4 py-3 bg-transparent border border-border/50 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className={cn(
                "w-full py-4 border font-mono text-xs uppercase tracking-widest transition-all duration-300",
                submitting || !name.trim()
                  ? "border-border/30 text-muted-foreground cursor-not-allowed"
                  : "border-accent text-accent hover:bg-accent hover:text-background"
              )}
            >
              {submitting ? "Signing..." : "Reclaim Your Voice"}
            </button>

            <p className="font-mono text-[10px] text-muted-foreground/60 text-center">
              Your signature will be permanently recorded on Arkiv's decentralized storage.
            </p>
          </form>
        </div>

        {/* Recent Signatures */}
        <div ref={signaturesRef}>
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Recent Signatories
            </span>
            <button
              onClick={loadSignatures}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-border/30 p-4 animate-pulse">
                  <div className="h-4 bg-border/30 w-1/3 mb-2" />
                  <div className="h-3 bg-border/20 w-2/3" />
                </div>
              ))}
            </div>
          ) : signatures.length === 0 ? (
            <div className="border border-border/30 p-8 text-center">
              <p className="font-mono text-sm text-muted-foreground">No signatures yet.</p>
              <p className="font-mono text-xs text-muted-foreground/60 mt-2">Be the first to sign!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
              {signatures.slice(0, 10).map((sig, index) => (
                <SignatureCard key={sig.id} signature={sig} index={index} />
              ))}
              {signatures.length > 10 && (
                <p className="font-mono text-xs text-muted-foreground text-center pt-4">
                  + {signatures.length - 10} more signatories
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SignatureCard({ signature, index }: { signature: Signature; index: number }) {
  return (
    <article className="group border border-border/30 p-4 hover:border-accent/40 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-mono text-sm text-foreground group-hover:text-accent transition-colors">
          {signature.name}
        </h4>
        <span className="font-mono text-[10px] text-muted-foreground/60">
          {new Date(signature.timestamp).toLocaleDateString()}
        </span>
      </div>
      {signature.message && (
        <p className="font-mono text-xs text-muted-foreground italic mb-2">"{signature.message}"</p>
      )}
      <div className="flex items-center gap-4">
        {signature.signerWallet && (
          <span className="font-mono text-[10px] text-muted-foreground/60">
            {signature.signerWallet.slice(0, 8)}...
          </span>
        )}
        {signature.txHash && (
          <a
            href={`https://explorer.arkiv.network/tx/${signature.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-accent hover:underline"
          >
            Verify →
          </a>
        )}
      </div>
    </article>
  )
}
