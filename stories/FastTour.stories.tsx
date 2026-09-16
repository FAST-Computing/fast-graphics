import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';

import { FastTour, type FastTourStep } from '../packages/components/src/FastTour';
import { FastButton } from '../packages/components/src/FastButton';

const meta: Meta<typeof FastTour> = {
  title: 'Overlay/FastTour',
  component: FastTour,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FastTour>;

const DEMO_STEPS: FastTourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the demo',
    body: 'This step has no target, so its card is centered. Press Next to spotlight the sidebar.',
  },
  {
    id: 'sidebar',
    title: 'The sidebar',
    body: 'Steps can point at any element via a CSS selector and choose which side the card lands on.',
    target: '[data-tour="sidebar"]',
    placement: 'right',
  },
  {
    id: 'toolbar',
    title: 'The toolbar',
    body: 'Placement "above" keeps the card clear of the bottom bar. Keyboard arrows and Esc also work.',
    target: '[data-tour="toolbar"]',
    placement: 'above',
  },
  {
    id: 'done',
    title: "You're all set!",
    body: 'Finishing stores a flag in localStorage so the tour does not auto-open again.',
  },
];

const TourDemo: React.FC<{ autoStart?: boolean }> = ({ autoStart = false }) => {
  const [replayKey, setReplayKey] = useState(0);
  const [lastStep, setLastStep] = useState('—');

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          FastTour demo
        </Typography>
        <FastButton
          label="Replay tour"
          color="primary"
          width={140}
          height={40}
          animated
          onClick={() => setReplayKey((k) => k + 1)}
        />
      </Box>

      <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
        Current step: {lastStep}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
        <Box
          data-tour="sidebar"
          sx={{
            width: 180,
            p: 2,
            border: '2px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Sidebar</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Panel toggles live here.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 360,
            border: '2px dashed',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            Main canvas
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box data-tour="toolbar">
          <FastButton label="Toolbar anchor" color="paper" width={160} height={44} />
        </Box>
      </Box>

      <FastTour
        steps={DEMO_STEPS}
        storageKey="fast-graphics.storybook.tourDone"
        autoStart={autoStart}
        replayKey={replayKey}
        onStepEnter={(id) => setLastStep(id)}
        onStepExit={() => setLastStep('—')}
      />
    </Box>
  );
};

export const Replay: Story = {
  render: () => <TourDemo />,
};

export const AutoStart: Story = {
  render: () => <TourDemo autoStart />,
};
