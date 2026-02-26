import { HeroSection } from "@/components/hero-section"
import { PrinciplesSection } from "@/components/principles-section"
import { SignSection } from "@/components/sign-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <PrinciplesSection />
        <SignSection />
        <ColophonSection />
      </div>
    </main>
  )
}
