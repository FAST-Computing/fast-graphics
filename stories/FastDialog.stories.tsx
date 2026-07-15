import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FastDialog } from '../packages/components/src/FastDialog';
import { FastButton } from '../packages/components/src/FastButton';
import { Button, Typography, Box } from '@mui/material';

const meta: Meta<typeof FastDialog> = {
  title: 'Feedback/FastDialog',
  component: FastDialog,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    maxWidth: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof FastDialog>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <FastButton label="Open Dialog" onClick={() => setOpen(true)} width={160} height={40} />
        <FastDialog {...args} open={open} onClose={() => setOpen(false)} title="Example Dialog"
          actions={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button></>}
        >
          <Typography>This is a branded dialog.</Typography>
        </FastDialog>
      </Box>
    );
  },
};
