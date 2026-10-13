import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastRadioGroup } from '../packages/components/src/FastRadioGroup';
import { FastRadio } from '../packages/components/src/FastRadio';
import { FastRadioBox } from '../packages/components/src/FastRadioBox';
import PetsIcon from '@mui/icons-material/Pets';
import SetMealIcon from '@mui/icons-material/SetMeal';
import IcecreamIcon from '@mui/icons-material/Icecream';
import EggAltIcon from '@mui/icons-material/EggAlt';

const meta: Meta<typeof FastRadioGroup> = {
  title: 'Inputs/FastRadioGroup',
  component: FastRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'primaryMain', 'primaryLight', 'primaryDark', 'secondaryMain', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    orientation: { control: 'radio', options: ['row', 'column'] },
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastRadioGroup>;

export const Default: Story = {
  args: {
    label: 'Size',
    name: 'size',
    defaultValue: 'medium',
  },
  render: (args) => (
    <FastRadioGroup {...args}>
      <FastRadio value="small" label="Small" />
      <FastRadio value="medium" label="Medium" />
      <FastRadio value="large" label="Large" />
    </FastRadioGroup>
  ),
};

export const Required: Story = {
  args: {
    ...Default.args,
    defaultValue: undefined,
    required: true,
  },
  render: (args) => (
    <FastRadioGroup {...args}>
      <FastRadio value="small" label="Small" />
      <FastRadio value="medium" label="Medium" />
      <FastRadio value="large" label="Large" />
    </FastRadioGroup>
  ),
};

export const Column: Story = {
  args: {
    ...Default.args,
    orientation: 'column',
  },
  render: Default.render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    defaultValue: undefined,
    errorMessage: 'Please pick a size',
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: Default.render,
};

export const Boxes: Story = {
  args: {
    label: 'Favourite treat',
    name: 'treat',
  },
  render: (args) => (
    <FastRadioGroup {...args}>
      <FastRadioBox value="fish" icon={<SetMealIcon />} label="Fish" width={80} height={80} />
      <FastRadioBox value="icecream" icon={<IcecreamIcon />} label="Icecream" width={80} height={80} />
      <FastRadioBox value="eggs" icon={<EggAltIcon />} label="Eggs" width={80} height={80} />
    </FastRadioGroup>
  ),
};

export const BoxesRequired: Story = {
  args: {
    ...Boxes.args,
    label: 'Pick a pet',
    name: 'pet',
    color: 'secondary',
    required: true,
  },
  render: (args) => (
    <FastRadioGroup {...args}>
      <FastRadioBox value="cat" icon={<PetsIcon />} label="Cat" width={80} height={80} />
      <FastRadioBox value="fish" icon={<SetMealIcon />} label="Fish" width={80} height={80} />
      <FastRadioBox value="icecream" icon={<IcecreamIcon />} label="Icecream" width={80} height={80} />
    </FastRadioGroup>
  ),
};
