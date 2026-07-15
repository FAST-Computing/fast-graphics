import type { Meta, StoryObj } from '@storybook/react';
import { FastLoader } from '../packages/components/src/FastLoader';

const meta: Meta<typeof FastLoader> = {
  title: 'Feedback/FastLoader',
  component: FastLoader,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FastLoader>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 96 },
};

export const Secondary: Story = {
  args: { color: 'secondary' },
};
