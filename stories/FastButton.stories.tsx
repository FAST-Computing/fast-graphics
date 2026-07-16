import type { Meta, StoryObj } from '@storybook/react';
import { FastButton } from '../packages/components/src/FastButton';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';

const iconMap: Record<string, React.ReactNode> = {
  none: undefined,
  Payment: <PaymentIcon />,
  Favorite: <FavoriteIcon />,
  Cart: <ShoppingCartIcon />,
  Send: <SendIcon />,
  Delete: <DeleteIcon />,
  Edit: <EditIcon />,
  Settings: <SettingsIcon />,
  Search: <SearchIcon />,
};

const meta: Meta<typeof FastButton> = {
  title: 'Buttons/FastButton',
  component: FastButton,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'primaryLight', 'primaryDark', 'secondaryLight', 'secondaryDark', 'paper', 'text'] },
    variant: { control: 'radio', options: ['default', 'outlined', 'text'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    align: { control: 'radio', options: ['center', 'left', 'right'] },
    width: { control: 'text' },
    height: { control: 'text' },
    fontSize: { control: 'text' },
    animated: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FastButton>;

export const Default: Story = {
  args: { label: 'Button', color: 'primary', variant: 'default', width: '130px', height: '40px', animated: true },
};

export const Outlined: Story = {
  args: { ...Default.args, variant: 'outlined' },
};

export const TextVariant: Story = {
  args: { ...Default.args, variant: 'text' },
};

export const WithIcon: Story = {
  args: { ...Default.args, label: 'Pay', icon: <PaymentIcon />, width: '160px' },
};

export const IconRight: Story = {
  args: { ...WithIcon.args, iconPosition: 'right' },
};

export const Selected: Story = {
  args: { ...Default.args, selected: true, animated: false },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};

export const LeftAligned: Story = {
  args: { ...Default.args, label: 'Left', align: 'left', width: '200px' },
};

export const RightAligned: Story = {
  args: { ...Default.args, label: 'Right', align: 'right', width: '200px' },
};
