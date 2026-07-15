import type { Meta, StoryObj } from '@storybook/react';
import { FastDropdown } from '../packages/components/src/FastDropdown';

const meta: Meta<typeof FastDropdown> = {
  title: 'Navigation/FastDropdown',
  component: FastDropdown,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    variant: { control: 'radio', options: ['default', 'outlined', 'text'] },
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

export const Outlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'outlined' },
};

export const Open: Story = {
  ...Default,
  args: { ...Default.args, defaultOpen: true },
};
