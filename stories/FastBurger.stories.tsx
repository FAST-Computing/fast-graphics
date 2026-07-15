import type { Meta, StoryObj } from '@storybook/react';
import { FastBurger } from '../packages/components/src/FastBurger';

const meta: Meta<typeof FastBurger> = {
  title: 'Navigation/FastBurger',
  component: FastBurger,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'number' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastBurger>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Secondary: Story = {
  args: { color: 'secondary' },
};
