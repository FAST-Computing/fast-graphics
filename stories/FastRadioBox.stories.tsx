import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastRadioBox } from '../packages/components/src/FastRadioBox';
import { FastRadioGroup } from '../packages/components/src/FastRadioGroup';
import PetsIcon from '@mui/icons-material/Pets';
import SetMealIcon from '@mui/icons-material/SetMeal';
import EggAltIcon from '@mui/icons-material/EggAlt';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { Box } from '@mui/material';

const meta: Meta<typeof FastRadioBox> = {
  title: 'Inputs/FastRadioBox',
  component: FastRadioBox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    label: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastRadioBox>;

export const Default: Story = {
  args: { icon: <PetsIcon />, label: 'Cat', name: 'pet', width: 80, height: 80 },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
};

export const FoodGroup: Story = {
  args: {
    color: "primary"
  },

  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FastRadioBox color="primary" name="food" icon={<SetMealIcon />} label="Fish" defaultChecked />
      <FastRadioBox color="primary" name="food" icon={<EggAltIcon />} label="Eggs" />
      <FastRadioBox color="primary" name="food" icon={<IcecreamIcon />} label="Icecream" />
    </Box>
  )
};

export const RequiredGroup: Story = {
  render: () => (
    <FastRadioGroup label="Favourite food" name="food-required" required>
      <FastRadioBox value="fish" icon={<SetMealIcon />} label="Fish" width={80} height={80} />
      <FastRadioBox value="eggs" icon={<EggAltIcon />} label="Eggs" width={80} height={80} />
      <FastRadioBox value="icecream" icon={<IcecreamIcon />} label="Icecream" width={80} height={80} />
    </FastRadioGroup>
  )
};
