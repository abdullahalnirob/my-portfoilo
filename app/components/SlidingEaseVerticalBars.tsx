"use client"

import { useEffect, useRef, useCallback } from "react"

interface SlidingEaseVerticalBarsProps {
  backgroundColor?: string
  lineColor?: string
  barColor?: string
  lineWidth?: number
  animationSpeed?: number
  removeWaveLine?: boolean
  /** how much faster the motion runs while the pointer is over the band */
  hoverSpeedMultiplier?: number
  /** band height — change the px value here or override with the `className` prop */
  className?: string
}

interface Bar {
  y: number
  height: number
  width: number
}

const noise = (x: number, y: number, t: number): number => {
  const n = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t) + Math.sin(x * 0.03 - t) * Math.cos(y * 0.01 + t)
  return (n + 1) / 2
}

const generatePattern = (seed: number, width: number, height: number, numLines: number): Bar[][] => {
  const pattern: Bar[][] = []
  const lineSpacing = width / numLines

  for (let i = 0; i < numLines; i++) {
    const lineBars: Bar[] = []
    let currentY = 0

    while (currentY < height) {
      const noiseVal = noise(i * lineSpacing, currentY, seed)
      if (noiseVal > 0.5) {
        const barLength = 10 + noiseVal * 30
        const barWidth = 2 + noiseVal * 3
        lineBars.push({
          y: currentY + barLength / 2,
          height: barLength,
          width: barWidth,
        })
        currentY += barLength + 15
      } else {
        currentY += 15
      }
    }
    pattern.push(lineBars)
  }

  return pattern
}

const SlidingEaseVerticalBars = ({
  backgroundColor = "#F0EEE6",
  lineColor = "#444",
  barColor = "#5E5D59",
  lineWidth = 1,
  animationSpeed = 0.005,
  removeWaveLine = true,
  hoverSpeedMultiplier = 1.5,
  className = "h-[150px]", // 👈 band height — change this px value
}: SlidingEaseVerticalBarsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const lastFrameRef = useRef<number>(0)
  const isHoveredRef = useRef(false)
  // eased toward the hover multiplier so the speed change is felt, not seen
  const speedRef = useRef(1)
  // parked off-canvas so nothing is "hovered" before the pointer arrives
  const mouseRef = useRef({ x: -9999, y: -9999, isDown: false })
  const transitionBursts = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])
  const dprRef = useRef<number>(1)
  // patterns depend only on size, so they are rebuilt on resize — not every frame
  const patternRef = useRef<{
    numLines: number
    lineSpacing: number
    pattern1: Bar[][]
    pattern2: Bar[][]
  }>({ numLines: 0, lineSpacing: 0, pattern1: [], pattern2: [] })

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 180
    return Math.max(0, 1 - distance / maxDistance)
  }

  const getTransitionBurstInfluence = (x: number, y: number, currentTime: number): number => {
    let totalInfluence = 0

    transitionBursts.current.forEach((burst) => {
      const age = currentTime - burst.time
      const maxAge = 2500
      if (age < maxAge) {
        const dx = x - burst.x
        const dy = y - burst.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const burstRadius = (age / maxAge) * 300
        const burstWidth = 60
        if (Math.abs(distance - burstRadius) < burstWidth) {
          const burstStrength = (1 - age / maxAge) * burst.intensity
          const proximityToBurst = 1 - Math.abs(distance - burstRadius) / burstWidth
          totalInfluence += burstStrength * proximityToBurst
        }
      }
    })

    return Math.min(totalInfluence, 1.5)
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    dprRef.current = dpr

    // measure the container, not the viewport
    const { width, height } = container.getBoundingClientRect()
    if (width === 0 || height === 0) return

    // actual pixel buffer, scaled up for high DPI
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)

    // CSS size stays in layout pixels
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext("2d")
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const numLines = Math.max(1, Math.floor(width / 15))
    patternRef.current = {
      numLines,
      lineSpacing: width / numLines,
      pattern1: generatePattern(0, width, height, numLines),
      pattern2: generatePattern(5, width, height, numLines),
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    mouseRef.current.x = -9999
    mouseRef.current.y = -9999
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    transitionBursts.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2,
    })

    const now = Date.now()
    transitionBursts.current = transitionBursts.current.filter((burst) => now - burst.time < 2500)
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  // draws a single frame — the loop itself lives in the effect below
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()

    // frame-rate independent: normalise to a 60fps step so 120Hz screens
    // do not run the animation at double speed
    const elapsed = lastFrameRef.current ? currentTime - lastFrameRef.current : 16.667
    lastFrameRef.current = currentTime
    const delta = Math.min(elapsed, 50) / 16.667

    // ease the speed toward its target instead of snapping on hover
    const targetSpeed = isHoveredRef.current ? hoverSpeedMultiplier : 1
    speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, 0.06 * delta)

    timeRef.current += animationSpeed * speedRef.current * delta

    // CSS pixel dimensions — the context is already scaled by dpr
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const { numLines, lineSpacing, pattern1, pattern2 } = patternRef.current
    if (numLines === 0) return

    // continuous ping-pong between the two patterns — no dwell at either end,
    // so the bars are always in motion
    const cycle = timeRef.current % (Math.PI * 2)
    const smoothEasing = (1 - Math.cos(cycle)) / 2

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    const red = Number.parseInt(barColor.slice(1, 3), 16)
    const green = Number.parseInt(barColor.slice(3, 5), 16)
    const blue = Number.parseInt(barColor.slice(5, 7), 16)

    // Draw lines and interpolated bars
    for (let i = 0; i < numLines; i++) {
      const x = i * lineSpacing + lineSpacing / 2
      const lineMouseInfluence = getMouseInfluence(x, height / 2)

      // Draw vertical line with mouse influence
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth + lineMouseInfluence * 2
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // Interpolate between patterns
      const bars1 = pattern1[i] || []
      const bars2 = pattern2[i] || []
      const maxBars = Math.max(bars1.length, bars2.length)

      for (let j = 0; j < maxBars; j++) {
        let bar1 = bars1[j]
        let bar2 = bars2[j]

        if (!bar1) bar1 = { y: bar2.y - 100, height: 0, width: 0 }
        if (!bar2) bar2 = { y: bar1.y + 100, height: 0, width: 0 }

        const barMouseInfluence = getMouseInfluence(x, bar1.y)
        const burstInfluence = getTransitionBurstInfluence(x, bar1.y, currentTime)

        // Enhanced wave motion with mouse and burst influence.
        // The 0.35 floor keeps the wave alive at both ends of the cycle —
        // without it the bars freeze whenever a pattern is fully reached.
        const waveEnvelope = 0.35 + 0.65 * (smoothEasing * (1 - smoothEasing) * 4)
        const baseWaveOffset = Math.sin(i * 0.3 + j * 0.5 + timeRef.current * 2) * 10 * waveEnvelope

        const mouseWaveOffset = barMouseInfluence * Math.sin(timeRef.current * 3 + i * 0.2) * 15
        const burstWaveOffset = burstInfluence * Math.sin(timeRef.current * 4 + j * 0.3) * 20
        const totalWaveOffset = baseWaveOffset + mouseWaveOffset + burstWaveOffset

        // Interpolate properties
        const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + totalWaveOffset
        const barHeight =
          bar1.height + (bar2.height - bar1.height) * smoothEasing + barMouseInfluence * 5 + burstInfluence * 8
        const barWidth =
          bar1.width + (bar2.width - bar1.width) * smoothEasing + barMouseInfluence * 2 + burstInfluence * 3

        // Draw bar with enhanced effects
        if (barHeight > 0.1 && barWidth > 0.1) {
          const intensity = Math.min(1, 0.8 + barMouseInfluence * 0.2 + burstInfluence * 0.3)

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${intensity})`
          ctx.fillRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight)
        }
      }
    }

    // Draw transition burst effects
    if (!removeWaveLine) {
      transitionBursts.current.forEach((burst) => {
        const age = currentTime - burst.time
        const maxAge = 2500
        if (age < maxAge) {
          const progress = age / maxAge
          const radius = progress * 300
          const alpha = (1 - progress) * 0.2 * burst.intensity

          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`
          ctx.lineWidth = 2
          ctx.arc(burst.x, burst.y, radius, 0, 2 * Math.PI)
          ctx.stroke()
        }
      })
    }
  }, [backgroundColor, lineColor, removeWaveLine, barColor, lineWidth, animationSpeed, hoverSpeedMultiplier])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    resizeCanvas()

    // track the container instead of the window so it survives layout changes
    const observer = new ResizeObserver(() => resizeCanvas())
    observer.observe(container)

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    const loop = () => {
      drawFrame()
      animationFrameId.current = requestAnimationFrame(loop)
    }
    animationFrameId.current = requestAnimationFrame(loop)

    return () => {
      observer.disconnect()
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
      timeRef.current = 0
      lastFrameRef.current = 0
      speedRef.current = 1
      isHoveredRef.current = false
      transitionBursts.current = []
    }
  }, [
    drawFrame,
    resizeCanvas,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
    </div>
  )
}

export default SlidingEaseVerticalBars
