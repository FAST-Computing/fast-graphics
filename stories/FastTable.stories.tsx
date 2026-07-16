import type { Meta, StoryObj } from '@storybook/react';
import { FastTable } from '../packages/components/src/FastTable';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

type Person = { name: string; age: number; email: string };
const data: Person[] = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { name: 'Diana', age: 28, email: 'diana@example.com' },
  { name: 'Ethan', age: 32, email: 'ethan@example.com' },
  { name: 'Fiona', age: 27, email: 'fiona@example.com' },
  { name: 'George', age: 41, email: 'george@example.com' },
  { name: 'Hannah', age: 29, email: 'hannah@example.com' },
  { name: 'Ian', age: 34, email: 'ian@example.com' },
  { name: 'Julia', age: 31, email: 'julia@example.com' },
  { name: 'Kevin', age: 26, email: 'kevin@example.com' },
  { name: 'Laura', age: 33, email: 'laura@example.com' },
  { name: 'Marcus', age: 38, email: 'marcus@example.com' },
  { name: 'Natalie', age: 24, email: 'natalie@example.com' },
  { name: 'Oliver', age: 45, email: 'oliver@example.com' },
  { name: 'Penelope', age: 29, email: 'penelope@example.com' },
  { name: 'Quentin', age: 36, email: 'quentin@example.com' },
  { name: 'Rachel', age: 30, email: 'rachel@example.com' },
  { name: 'Samuel', age: 27, email: 'samuel@example.com' },
  { name: 'Tina', age: 42, email: 'tina@example.com' },
  { name: 'Victor', age: 31, email: 'victor@example.com' },
  { name: 'Wendy', age: 25, email: 'wendy@example.com' },
  { name: 'Xavier', age: 39, email: 'xavier@example.com' },
  { name: 'Yasmin', age: 28, email: 'yasmin@example.com' },
  { name: 'Zachary', age: 33, email: 'zachary@example.com' }
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
  args: { data, columns, width: '100%' },
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
