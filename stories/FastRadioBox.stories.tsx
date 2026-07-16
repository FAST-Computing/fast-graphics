import type { Meta, StoryObj } from '@storybook/react';
import { FastRadioBox } from '../packages/components/src/FastRadioBox';
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
    color: { control: 'radio', options: ['primary', 'secondary'] },
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
