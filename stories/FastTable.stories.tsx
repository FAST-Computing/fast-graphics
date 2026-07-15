import type { Meta, StoryObj } from '@storybook/react';
import { FastTable } from '../packages/components/src/FastTable';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

type Person = { name: string; age: number; email: string };
const data: Person[] = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { name: 'Diana', age: 28, email: 'diana@example.com' },
];
const ch = createColumnHelper<Person>();
const columns: ColumnDef<Person, any>[] = [
  ch.accessor('name', { header: 'Name', cell: info => info.getValue() }),
  ch.accessor('age', { header: 'Age', cell: info => info.getValue() }),
  ch.accessor('email', { header: 'Email', cell: info => info.getValue() }),
];

const meta: Meta<typeof FastTable> = {
  title: 'Data/FastTable',
  component: FastTable,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    sortable: { control: 'boolean' },
    pageable: { control: 'boolean' },
    searchable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FastTable<Person>>;

export const Default: Story = {
  args: { data, columns, width: '600px' },
};

export const Sortable: Story = {
  args: { ...Default.args, sortable: true },
};

export const Pageable: Story = {
  args: { ...Default.args, sortable: true, pageable: true },
};

export const Searchable: Story = {
  args: { ...Pageable.args, searchable: true },
};
