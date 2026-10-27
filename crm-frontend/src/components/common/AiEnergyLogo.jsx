import React, { useId } from 'react';
import newLogoAsset from '../../assets/newupdatelogo.png';

/**
 * AiEnergyLogo — Official CRM nErgy AI Energy Logo
 *
 * Requirements (C-05):
 * - Center Blue Area: Digital Energy + Soft Smoke + Glowing Plasma + AI Core.
 * - Visually distinct from original reference artwork for legal compliance.
 * - Subtle, smooth, lightweight animations (smoke drift, plasma breathing, circuit pulses).
 * - Full responsive size API (numeric size & string presets: sm, md, lg, xl, 2xl).
 * - Preserves existing component props (size, showText, subtitle, className, style).
 */
export const AiEnergyLogo = ({
  size = 38,
  showText = true,
  subtitle = 'Enterprise CRM • ERP • AI',
  className = '',
  style = {},
}) => {
  const instanceId = useId().replace(/:/g, '');

  // Size mapping (supports numeric pixels or preset strings)
  const sizeMap = {
    xs: 24,
    sm: 28,
    md: 38,
    lg: 48,
    xl: 64,
    '2xl': 80,
  };
  const pxSize = typeof size === 'number' ? size : sizeMap[size] || 38;

  const smokeFilterId = `ai-smoke-${instanceId}`;
  const plasmaGradId = `ai-plasma-${instanceId}`;
  const coreGlowId = `ai-core-${instanceId}`;
  const circuitGradId = `ai-circuit-${instanceId}`;

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      style={{ cursor: 'pointer', ...style }}
      aria-label="CRM nErgy AI Logo"
    >
      {/* Dynamic Style Block for Scoped Keyframe Animations */}
      <style>{`
        @keyframes aiPulseGlow_${instanceId} {
          0%, 100% {
            opacity: 0.75;
            transform: scale(0.97);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        @keyframes aiSmokeSwirlClockwise_${instanceId} {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.08);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes aiSmokeSwirlCounter_${instanceId} {
          0% {
            transform: rotate(360deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(0.95);
          }
          100% {
            transform: rotate(0deg) scale(1.05);
          }
        }

        @keyframes aiCircuitPulse_${instanceId} {
          0% {
            stroke-dashoffset: 40;
            opacity: 0.5;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -40;
            opacity: 0.5;
          }
        }

        @keyframes aiCoreBreathing_${instanceId} {
          0%, 100% {
            r: 7.5;
            filter: drop-shadow(0 0 4px #00f0ff);
          }
          50% {
            r: 9;
            filter: drop-shadow(0 0 10px #38bdf8) drop-shadow(0 0 16px #0284c7);
          }
        }

        @keyframes aiEnergyWave_${instanceId} {
          0% {
            r: 8;
            opacity: 0.9;
            stroke-width: 2.2;
          }
          100% {
            r: 26;
            opacity: 0;
            stroke-width: 0.5;
          }
        }
      `}</style>

      {/* Main Logo Emblem Container */}
      <div
        style={{
          width: `${pxSize}px`,
          height: `${pxSize}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Layer 0: Ambient Multi-Spectrum Energy Aura */}
        <div
          style={{
            position: 'absolute',
            inset: '-18%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(14, 165, 233, 0.25) 35%, rgba(249, 115, 22, 0.22) 55%, transparent 72%)',
            filter: 'blur(7px)',
            pointerEvents: 'none',
            animation: `aiPulseGlow_${instanceId} 4s ease-in-out infinite`,
          }}
        />

        {/* Layer 1: Base Emblem Graphic (Masked circle to client asset) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.35)',
            backgroundColor: '#020617',
          }}
        >
          <img
            src={newLogoAsset}
            alt=""
            aria-hidden="true"
            style={{
              width: '136%',
              height: '136%',
              maxWidth: 'none',
              position: 'absolute',
              top: '-6%',
              left: '-18%',
              objectFit: 'cover',
              objectPosition: 'center 26%',
              filter: 'contrast(1.12) brightness(1.04) saturate(1.15)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Layer 2: Center Blue Energy & Ethereal Smoke SVG Enhancement */}
        <svg
          viewBox="0 0 100 100"
          width={pxSize}
          height={pxSize}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <defs>
            {/* SVG Turbulence Filter for Living Organic Smoke */}
            <filter id={smokeFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.07"
                numOctaves="3"
                result="noise"
                seed="8"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="7"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="1.2" />
            </filter>

            {/* Radiant Plasma Core Gradient */}
            <radialGradient id={plasmaGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#67e8f9" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>

            {/* Center Blue Zone Smoke Gradient */}
            <radialGradient id={coreGlowId} cx="42%" cy="48%" r="45%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Digital Circuit Gradient */}
            <linearGradient id={circuitGradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* 1. Center Blue Smoke Tendril Cloud (Swirling Clockwise) */}
          <g
            style={{
              transformOrigin: '46px 48px',
              animation: `aiSmokeSwirlClockwise_${instanceId} 14s linear infinite`,
            }}
          >
            <path
              d="M 46 26 C 36 28, 28 36, 27 46 C 26 54, 32 63, 40 67 C 48 70, 56 66, 61 60 C 66 54, 66 45, 62 38 C 58 31, 52 25, 46 26 Z"
              fill={`url(#${coreGlowId})`}
              filter={`url(#${smokeFilterId})`}
              opacity="0.85"
            />
          </g>

          {/* 2. Counter-Rotating Ethereal Plasma Veil (Diffused smoke depth) */}
          <g
            style={{
              transformOrigin: '48px 50px',
              animation: `aiSmokeSwirlCounter_${instanceId} 18s linear infinite`,
            }}
          >
            <path
              d="M 33 42 C 30 50, 36 60, 45 63 C 53 65, 62 60, 64 51 C 66 42, 60 33, 51 31 C 41 29, 35 34, 33 42 Z"
              fill={`url(#${plasmaGradId})`}
              filter={`url(#${smokeFilterId})`}
              opacity="0.55"
              style={{ mixBlendMode: 'screen' }}
            />
          </g>

          {/* 3. Concentric Outward Energy Waves (Neural heartbeat flow) */}
          <circle
            cx="50"
            cy="48"
            r="12"
            fill="none"
            stroke="#38bdf8"
            style={{
              animation: `aiEnergyWave_${instanceId} 3.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
            }}
          />
          <circle
            cx="50"
            cy="48"
            r="12"
            fill="none"
            stroke="#06b6d4"
            style={{
              animation: `aiEnergyWave_${instanceId} 3.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
              animationDelay: '1.6s',
            }}
          />

          {/* 4. Digital Energy Circuit Traces in Center Blue Sector */}
          <g stroke={`url(#${circuitGradId})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Outward Circuit Stream 1 */}
            <path
              d="M 44 48 L 36 48 L 32 44 L 25 44"
              strokeWidth="1.6"
              strokeDasharray="12 4"
              style={{ animation: `aiCircuitPulse_${instanceId} 2.8s linear infinite` }}
            />
            {/* Outward Circuit Stream 2 */}
            <path
              d="M 43 54 L 37 60 L 30 60 L 26 64"
              strokeWidth="1.6"
              strokeDasharray="10 4"
              style={{ animation: `aiCircuitPulse_${instanceId} 3.2s linear infinite` }}
            />
            {/* Outward Circuit Stream 3 */}
            <path
              d="M 45 42 L 39 36 L 33 36 L 30 32"
              strokeWidth="1.6"
              strokeDasharray="10 4"
              style={{ animation: `aiCircuitPulse_${instanceId} 2.5s linear infinite` }}
            />

            {/* Glowing Circuit Node Dots */}
            <circle cx="25" cy="44" r="1.8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="26" cy="64" r="1.8" fill="#06b6d4" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="30" cy="32" r="1.8" fill="#67e8f9" stroke="#ffffff" strokeWidth="0.6" />
          </g>

          {/* 5. Center AI Quantum Core (Breathing High-Intensity Reactor) */}
          <circle
            cx="50"
            cy="48"
            r="8"
            fill={`url(#${plasmaGradId})`}
            style={{
              animation: `aiCoreBreathing_${instanceId} 3.2s ease-in-out infinite`,
            }}
          />

          {/* 6. Central Super-Luminescent Pinpoint */}
          <circle cx="50" cy="48" r="3" fill="#ffffff" opacity="0.95" />

          {/* 7. Subtle Exterior Energy Corona Accent */}
          <circle
            cx="50"
            cy="50"
            r="47.5"
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="1.2"
            strokeDasharray="75 25 60 40"
            style={{
              transformOrigin: '50px 50px',
              animation: `aiSmokeSwirlClockwise_${instanceId} 28s linear infinite`,
            }}
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 line-height-none">
            <span
              style={{
                fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
                fontWeight: 800,
                fontSize: pxSize > 40 ? '19px' : '16px',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary, #0f172a)',
                whiteSpace: 'nowrap',
              }}
            >
              CRM nErgy
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                color: '#ffffff',
                fontSize: pxSize > 40 ? '11px' : '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '5px',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 6px rgba(6, 182, 212, 0.4)',
                lineHeight: 1.1,
              }}
            >
              AI
            </span>
          </div>
          {subtitle && (
            <span
              style={{
                fontSize: '9.5px',
                color: 'var(--text-tertiary, #64748b)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginTop: '3px',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AiEnergyLogo;

