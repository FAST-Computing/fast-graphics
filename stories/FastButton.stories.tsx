import type { Meta, StoryObj } from '@storybook/react';
import { FastButton } from '../packages/components/src/FastButton';
import PaymentIcon from '@mui/icons-material/Payment';

const meta: Meta<typeof FastButton> = {
  title: 'Buttons/FastButton',
  component: FastButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'primaryLight', 'primaryDark', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    variant: { control: 'radio', options: ['default', 'outlined', 'text'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    align: { control: 'radio', options: ['center', 'left', 'right'] },
    width: { control: 'number' },
    height: { control: 'number' },
    fontSize: { control: 'number' },
    animated: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastButton>;

export const Default: Story = {
  args: { label: 'Button', color: 'primary', variant: 'default', width: 130, height: 40 },
};

export const Outlined: Story = {
  args: { ...Default.args, variant: 'outlined' },
};

export const TextVariant: Story = {
  args: { ...Default.args, variant: 'text' },
};

export const WithIcon: Story = {
  args: { ...Default.args, label: 'Pay', icon: <PaymentIcon />, width: 160 },
};

export const IconRight: Story = {
  args: { ...WithIcon.args, iconPosition: 'right' },
};

export const Animated: Story = {
  args: { ...WithIcon.args, animated: true },
};

export const Selected: Story = {
  args: { ...Default.args, selected: true },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};

export const LeftAligned: Story = {
  args: { ...Default.args, label: 'Left', align: 'left', width: 200 },
};

export const RightAligned: Story = {
  args: { ...Default.args, label: 'Right', align: 'right', width: 200 },
};
