export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-xl tracking-wider text-blue-ice ${className}`}>
      LUCID/<span className="font-mono text-cyan-bright">01</span>
    </span>
  )
}
