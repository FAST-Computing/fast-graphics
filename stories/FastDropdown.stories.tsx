import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastDropdown } from '../packages/components/src/FastDropdown';

const meta: Meta<typeof FastDropdown> = {
  title: 'Navigation/FastDropdown',
  component: FastDropdown,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    variant: { control: 'radio', options: ['default', 'outlined', 'text'] },
    direction: { control: 'radio', options: ['bottom', 'top', 'left', 'right'] },
    label: { control: 'text' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FastDropdown>;

export const Default: Story = {
  args: { label: 'Actions', width: '200px' },
  render: (args) => (
    <FastDropdown {...args}>
      <button type="button" onClick={() => alert('Edit')}>Edit profile</button>
      <button type="button" onClick={() => alert('Settings')}>Settings</button>
      <button type="button" onClick={() => alert('Logout')}>Logout</button>
    </FastDropdown>
  ),
};

export const Secondary: Story = {
  ...Default,
  args: { ...Default.args, color: 'secondary' },
};

export const Outlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'outlined' },
};

export const Open: Story = {
  ...Default,
  args: { ...Default.args, defaultOpen: true },
};

export const Top: Story = {
  ...Default,
  args: { ...Default.args, direction: 'top', defaultOpen: true },
};

export const Left: Story = {
  ...Default,
  args: { ...Default.args, direction: 'left', defaultOpen: true },
};

export const Right: Story = {
  ...Default,
  args: { ...Default.args, direction: 'right', defaultOpen: true },
};
