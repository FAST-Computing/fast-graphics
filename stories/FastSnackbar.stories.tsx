import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FastSnackbar } from '../packages/components/src/FastSnackbar';
import { FastButton } from '../packages/components/src/FastButton';
import { Box } from '@mui/material';

const meta: Meta<typeof FastSnackbar> = {
  title: 'Feedback/FastSnackbar',
  component: FastSnackbar,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    type: { control: 'radio', options: ['default', 'success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    hideClose: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    anchorOrigin: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof FastSnackbar>;

export const Default: Story = {
  args: {
    message: 'Profile saved successfully!',
    type: 'success',
    autoHideDuration: 4000,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <FastButton label="Show snackbar" onClick={() => setOpen(true)} width={180} height={40} />
        <FastSnackbar {...args} open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong.',
    type: 'error',
    autoHideDuration: 4000,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <FastButton label="Show error" onClick={() => setOpen(true)} width={180} height={40} />
        <FastSnackbar {...args} open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};

export const WithAction: Story = {
  args: {
    message: 'Cat adopted!',
    type: 'default',
    actionLabel: 'Undo',
    autoHideDuration: 6000,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <FastButton label="Adopt a cat" onClick={() => setOpen(true)} width={180} height={40} />
        <FastSnackbar
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onAction={() => { alert('Adoption reverted!'); setOpen(false); }}
        />
      </Box>
    );
  },
};

export const Warning: Story = {
  args: {
    message: 'Your session is about to expire.',
    type: 'warning',
    autoHideDuration: 5000,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <FastButton label="Warn me" onClick={() => setOpen(true)} width={180} height={40} />
        <FastSnackbar {...args} open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};

export const Open: Story = {
  args: {
    message: 'This snackbar is already open. Tweak controls below.',
    type: 'info',
    autoHideDuration: null,
    open: true,
    onClose: () => {},
  },
};
