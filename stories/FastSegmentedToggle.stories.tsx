import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TsunamiIcon from '@mui/icons-material/Tsunami';
import LayersIcon from '@mui/icons-material/Layers';
import GrainIcon from '@mui/icons-material/Grain';
import { Box, Typography } from '@mui/material';

import {
  FastSegmentedToggle,
  type FastSegmentedOption,
} from '../packages/components/src/FastSegmentedToggle';

const meta: Meta<typeof FastSegmentedToggle> = {
  title: 'Inputs/FastSegmentedToggle',
  component: FastSegmentedToggle,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    disabled: { control: 'boolean' },
    segmentWidth: { control: 'number' },
    height: { control: 'number' },
    ariaLabel: { control: 'text' },
  },
  args: {
    options: [
      { value: '3d', label: '3D', icon: <TsunamiIcon /> },
      { value: 'sections', label: 'Sections', icon: <LayersIcon /> },
    ],
    value: '3d',
    segmentWidth: 120,
    height: 38,
    ariaLabel: 'View mode',
  },
};

export default meta;
type Story = StoryObj<typeof FastSegmentedToggle>;

const Controlled: React.FC<Partial<React.ComponentProps<typeof FastSegmentedToggle>>> = (args) => {
  const [value, setValue] = useState(args.value ?? '3d');
  return <FastSegmentedToggle {...args} options={args.options!} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const Secondary: Story = {
  args: { color: 'secondary' },
  render: (args) => <Controlled {...args} />,
};

export const ThreeOptions: Story = {
  args: {
    options: [
      { value: '3d', label: '3D', icon: <TsunamiIcon /> },
      { value: 'sections', label: 'Sections', icon: <LayersIcon /> },
      { value: 'points', label: 'Points', icon: <GrainIcon /> },
    ],
    value: 'sections',
    ariaLabel: 'Display mode',
  },
  render: (args) => <Controlled {...args} />,
};

export const WithoutIcons: Story = {
  args: {
    options: [
      { value: 'on', label: 'On' },
      { value: 'off', label: 'Off' },
    ],
    value: 'on',
  },
  render: (args) => <Controlled {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Controlled {...args} />,
};

export const BoundToContent: Story = {
  args: {
    options: [
      { value: '3d', label: '3D', icon: <TsunamiIcon /> },
      { value: 'sections', label: 'Sections', icon: <LayersIcon /> },
    ],
    value: '3d',
  },
  render: (args) => {
    const options: FastSegmentedOption[] = args.options as FastSegmentedOption[];
    const [value, setValue] = useState('3d');
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <FastSegmentedToggle {...args} options={options} value={value} onChange={setValue} />
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Selected: {value}
        </Typography>
      </Box>
    );
  },
};
