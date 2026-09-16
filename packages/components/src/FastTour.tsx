'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, alpha, useTheme } from '@mui/material';

import { FastButton } from './FastButton.js';

export type FastTourStepPlacement = 'below' | 'above' | 'right' | 'left' | 'auto';

export interface FastTourStep {
  /** Stable identifier, also passed to onStepEnter/onStepExit. */
  id: string;
  /** Card title. */
  title: string;
  /** Card body text. */
  body: string;
  /** CSS selector of the element to spotlight. Omit for a centered, target-less step. */
  target?: string;
  /** Preferred side of the target for the card. "auto" picks below/above. Default "auto". */
  placement?: FastTourStepPlacement;
}

export interface FastTourProps {
  /** Ordered list of steps. Array order defines the tour order. */
  steps: FastTourStep[];
  /** localStorage key used to remember that the tour was completed. */
  storageKey: string;
  /** Auto-open the tour on first visit (when storageKey is unset). Default false. */
  autoStart?: boolean;
  /** Increment to replay the tour from the first step. */
  replayKey?: number;
  /** Called before a step is shown. Use it to reveal hidden UI. */
  onStepEnter?: (stepId: string) => void;
  /** Called when leaving a step (or closing the tour). Use it to revert reveals. */
  onStepExit?: (stepId: string) => void;
}

type Spot = { left: number; top: number; width: number; height: number; radius: number };
type Side = 'below' | 'above' | 'right' | 'left';
type CardPos = { top: number; left: number; side: Side };

const CARD_WIDTH = 320;
const GAP = 18;
const ARROW_S = 14;

const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi);

export function FastTour({
  steps,
  storageKey,
  autoStart = false,
  replayKey = 0,
  onStepEnter,
  onStepExit,
}: FastTourProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [spot, setSpot] = useState<Spot | null>(null);
  const [cardPos, setCardPos] = useState<CardPos | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const autoOpenedRef = useRef(false);
  const handlersRef = useRef({ onStepEnter, onStepExit });
  handlersRef.current = { onStepEnter, onStepExit };

  const step = steps[index];
  const isLast = index === steps.length - 1;

  const close = useCallback((): void => setOpen(false), []);

  const finish = useCallback((): void => {
    try {
      localStorage.setItem(storageKey, '1');
    } catch {
      /* ignore storage errors */
    }
    setOpen(false);
  }, [storageKey]);

  const next = useCallback((): void => {
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const prev = useCallback((): void => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Auto-play on first visit, once the app signals it has finished loading.
  useEffect(() => {
    if (!autoStart || autoOpenedRef.current || steps.length === 0) return;
    let done = false;
    try {
      done = localStorage.getItem(storageKey) === '1';
    } catch {
      /* ignore */
    }
    if (done) return;
    autoOpenedRef.current = true;
    setOpen(true);
  }, [autoStart, storageKey, steps.length]);

  // Manual replay.
  useEffect(() => {
    if (replayKey > 0 && steps.length > 0) {
      setIndex(0);
      setOpen(true);
    }
  }, [replayKey, steps.length]);

  // Run onEnter/onExit around each step (reveal + revert of hidden UI).
  // Handlers are read from a ref so identity changes never re-trigger the cycle.
  useEffect(() => {
    if (!open || !steps[index]) return;
    const id = steps[index].id;
    handlersRef.current.onStepEnter?.(id);
    return () => handlersRef.current.onStepExit?.(id);
  }, [index, open, steps]);

  const measure = useCallback((): void => {
    const s = steps[index];
    if (!s || !s.target) {
      setSpot(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(s.target);
    if (!el) {
      setSpot(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const radius = parseFloat(cs.borderTopLeftRadius) || 10;
    setSpot({ left: r.left, top: r.top, width: r.width, height: r.height, radius });
  }, [index, steps]);

  // Re-measure on step change; the second pass lets onEnter reveals settle.
  useLayoutEffect(() => {
    if (!open) {
      setSpot(null);
      setCardPos(null);
      return;
    }
    measure();
    const t = window.setTimeout(measure, 180);
    return () => window.clearTimeout(t);
  }, [open, index, measure]);

  useEffect(() => {
    if (!open) return;
    const onViewChange = (): void => measure();
    window.addEventListener('resize', onViewChange);
    window.addEventListener('scroll', onViewChange, { passive: true });
    return () => {
      window.removeEventListener('resize', onViewChange);
      window.removeEventListener('scroll', onViewChange);
    };
  }, [open, measure]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, next, prev]);

  // Position the card relative to the current spot.
  useLayoutEffect(() => {
    if (!open || !step || !step.target || !spot) {
      setCardPos(null);
      return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cardH = cardRef.current?.offsetHeight ?? 150;
    const placement = step.placement ?? 'auto';
    const side: Side =
      placement === 'auto'
        ? spot.top + spot.height + GAP + cardH < vh - 16
          ? 'below'
          : 'above'
        : placement;

    let top = 16;
    let left = 16;
    if (side === 'below') {
      left = clamp(spot.left + spot.width / 2 - CARD_WIDTH / 2, 16, vw - CARD_WIDTH - 16);
      top = Math.min(Math.max(16, spot.top + spot.height + GAP), Math.max(16, vh - cardH - 16));
    } else if (side === 'above') {
      left = clamp(spot.left + spot.width / 2 - CARD_WIDTH / 2, 16, vw - CARD_WIDTH - 16);
      top = Math.max(16, spot.top - cardH - GAP);
    } else if (side === 'right') {
      left = spot.left + spot.width + GAP;
      top = clamp(spot.top + spot.height / 2 - cardH / 2, 16, vh - cardH - 16);
    } else {
      left = Math.max(16, spot.left - CARD_WIDTH - GAP);
      top = clamp(spot.top + spot.height / 2 - cardH / 2, 16, vh - cardH - 16);
    }
    setCardPos({ top, left, side });
  }, [open, index, spot, step]);

  if (!open || !step) return null;

  const primary = theme.palette.primary.main;
  const paper = theme.palette.background.paper;

  return (
    <>
      {/* Click blocker; also dims the whole screen for no-target steps */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          bgcolor: spot ? 'transparent' : alpha('#000000', 0.55),
          pointerEvents: 'auto',
        }}
      />

      {/* Spotlight cutout: dims everything around the target via box-shadow */}
      {spot && (
        <Box
          sx={{
            position: 'fixed',
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
            borderRadius: `${spot.radius}px`,
            pointerEvents: 'none',
            boxShadow: `0 0 0 2px ${alpha(primary, 0.95)}, 0 0 0 5px ${alpha(
              primary,
              0.3,
            )}, 0 0 0 9999vmax ${alpha('#000000', 0.6)}`,
            transition:
              'left 260ms ease, top 260ms ease, width 260ms ease, height 260ms ease, border-radius 260ms ease',
            zIndex: 210,
          }}
        />
      )}

      {/* Description card */}
      <Box
        ref={cardRef}
        sx={{
          position: 'fixed',
          zIndex: 211,
          top: cardPos ? cardPos.top : '50%',
          left: cardPos ? cardPos.left : '50%',
          transform: cardPos ? 'none' : 'translate(-50%, -50%)',
          width: { xs: '88vw', sm: CARD_WIDTH },
          bgcolor: paper,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.2)',
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
          p: 2,
          userSelect: 'none',
        }}
      >
        {spot && cardPos && <Arrow spot={spot} cardPos={cardPos} paper={paper} />}

        <Box
          component="button"
          type="button"
          aria-label="Close tour"
          onClick={close}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            border: 'none',
            borderRadius: '50%',
            bgcolor: 'transparent',
            color: theme.palette.text.secondary,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              bgcolor: alpha(theme.palette.text.primary, 0.08),
              color: theme.palette.text.primary,
            },
          }}
        >
          <Box component="span" sx={{ fontSize: 18, lineHeight: 1, fontWeight: 400 }}>
            ✕
          </Box>
        </Box>

        <Box
          sx={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: alpha(theme.palette.text.secondary, 0.8),
            mb: 0.5,
          }}
        >
          {index + 1} / {steps.length}
        </Box>
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '1.02rem',
            color: theme.palette.text.primary,
            lineHeight: 1.25,
            mb: 0.75,
            pr: 3,
          }}
        >
          {step.title}
        </Box>
        <Box
          sx={{
            fontSize: '0.85rem',
            color: theme.palette.text.secondary,
            lineHeight: 1.45,
            mb: 1.5,
          }}
        >
          {step.body}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
          <FastButton
            color="paper"
            label="Back"
            width={88}
            height={34}
            disabled={index === 0}
            onClick={prev}
          />
          <FastButton
            color="primary"
            label={isLast ? 'Finish' : 'Next'}
            width={110}
            height={34}
            onClick={isLast ? finish : next}
          />
        </Box>
      </Box>
    </>
  );
}

function Arrow({
  spot,
  cardPos,
  paper,
}: {
  spot: Spot;
  cardPos: CardPos;
  paper: string;
}): React.ReactElement {
  const { side } = cardPos;
  const centerX = spot.left + spot.width / 2;
  const centerY = spot.top + spot.height / 2;

  const style: React.CSSProperties = {
    position: 'absolute',
    width: ARROW_S,
    height: ARROW_S,
    backgroundColor: paper,
    clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
  };

  if (side === 'below') {
    style.top = -ARROW_S / 2 + 1;
    style.left = clamp(centerX - cardPos.left, ARROW_S, CARD_WIDTH - ARROW_S) - ARROW_S / 2;
    style.clipPath = 'polygon(50% 0, 0 100%, 100% 100%)';
  } else if (side === 'above') {
    style.bottom = -ARROW_S / 2 + 1;
    style.left = clamp(centerX - cardPos.left, ARROW_S, CARD_WIDTH - ARROW_S) - ARROW_S / 2;
    style.clipPath = 'polygon(0 0, 100% 0, 50% 100%)';
  } else if (side === 'right') {
    style.left = -ARROW_S / 2 + 1;
    style.top = clamp(centerY - cardPos.top, ARROW_S, 240) - ARROW_S / 2;
    style.clipPath = 'polygon(100% 0, 100% 100%, 0 50%)';
  } else {
    style.right = -ARROW_S / 2 + 1;
    style.top = clamp(centerY - cardPos.top, ARROW_S, 240) - ARROW_S / 2;
    style.clipPath = 'polygon(0 0, 0 100%, 100% 50%)';
  }

  return <Box sx={style} />;
}
