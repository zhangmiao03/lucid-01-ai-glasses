"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoShowcaseProps {
  src?: string
  poster?: string
}

export default function VideoShowcase({ src, poster }: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoSrc = src || `${import.meta.env.BASE_URL}demo.mp4`

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <section className="relative py-24 md:py-32" id="video-demo">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-blue-ice mb-4">See LUCID/01 in Action</h2>
          <p className="text-blue-ice/40 text-sm max-w-md mx-auto">
            A quick walkthrough of the LUCID/01 experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden optical-glass-strong group"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            className="w-full aspect-video object-cover"
            muted
            loop
            playsInline
            onEnded={() => setPlaying(false)}
          />

          {/* Video controls overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleMute}
              className="text-white/70 hover:text-white transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="text-xs text-white/50 font-mono">
              LUCID/01 · Product Demo
            </div>
          </div>

          {/* Play hint when not playing */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
              <div className="w-20 h-20 rounded-full bg-blue-luminous/20 backdrop-blur-md border border-blue-luminous/30 flex items-center justify-center text-white animate-pulse-soft">
                <Play size={32} className="ml-1.5 text-blue-ice" />
              </div>
            </div>
          )}
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-xs text-blue-ice/30 font-mono">
            Record your screen to create your own LUCID/01 demo video.
            <br />
            Place the video file at <code className="text-cyan-bright/50">public/demo.mp4</code> and rebuild.
          </p>
        </div>
      </div>
    </section>
  )
}
