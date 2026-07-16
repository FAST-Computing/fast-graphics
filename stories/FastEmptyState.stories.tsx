import type { Meta, StoryObj } from '@storybook/react';
import { FastEmptyState } from '../packages/components/src/FastEmptyState';
import { FastButton } from '../packages/components/src/FastButton';

const meta: Meta<typeof FastEmptyState> = {
  title: 'Feedback/FastEmptyState',
  component: FastEmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    width: { control: 'number' },
    imgWidth: { control: 'number' },
    imgHeight: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FastEmptyState>;

export const Default: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Add your first item to get started.',
    action: <FastButton label="Add item" color="primary" width={130} height={38} fontSize={13} />,
  },
};

export const NoAction: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your search or filters.',
  },
};
