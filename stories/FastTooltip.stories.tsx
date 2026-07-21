import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastTooltip } from '../packages/components/src/FastTooltip';
import { FastButton } from '../packages/components/src/FastButton';

const meta: Meta<typeof FastTooltip> = {
  title: 'Feedback/FastTooltip',
  component: FastTooltip,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'paper', 'text'] },
    title: { control: 'text' },
    placement: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
    },
    arrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastTooltip>;

export const Default: Story = {
  args: {
    title: 'Cats love to sleep',
    arrow: true,
    children: <FastButton label="Hover me" color="primary" width={140} height={40} />,
  },
};

export const Bottom: Story = {
  args: {
    ...Default.args,
    title: 'Secondary tooltip',
    color: 'secondary',
    placement: 'bottom',
  },
};

export const NoArrow: Story = {
  args: {
    ...Default.args,
    title: 'No arrow here',
    arrow: false,
  },
};
