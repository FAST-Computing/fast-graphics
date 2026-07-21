import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FastTable } from '../packages/components/src/FastTable';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

type Person = { name: string; age: number; email: string; delivered: string };
const data: Person[] = [
  { name: 'Alice', age: 30, email: 'alice@example.com', delivered: 'yes' },
  { name: 'Bob', age: 25, email: 'bob@example.com', delivered: 'no' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com', delivered: 'yes' },
  { name: 'Diana', age: 28, email: 'diana@example.com', delivered: 'yes' },
  { name: 'Ethan', age: 32, email: 'ethan@example.com', delivered: 'no' },
  { name: 'Fiona', age: 27, email: 'fiona@example.com', delivered: 'yes' },
  { name: 'George', age: 41, email: 'george@example.com', delivered: 'no' },
  { name: 'Hannah', age: 29, email: 'hannah@example.com', delivered: 'yes' },
  { name: 'Ian', age: 34, email: 'ian@example.com', delivered: 'no' },
  { name: 'Julia', age: 31, email: 'julia@example.com', delivered: 'yes' },
  { name: 'Kevin', age: 26, email: 'kevin@example.com', delivered: 'no' },
  { name: 'Laura', age: 33, email: 'laura@example.com', delivered: 'yes' },
  { name: 'Marcus', age: 38, email: 'marcus@example.com', delivered: 'yes' },
  { name: 'Natalie', age: 24, email: 'natalie@example.com', delivered: 'no' },
  { name: 'Oliver', age: 45, email: 'oliver@example.com', delivered: 'yes' },
  { name: 'Penelope', age: 29, email: 'penelope@example.com', delivered: 'no' },
  { name: 'Quentin', age: 36, email: 'quentin@example.com', delivered: 'yes' },
  { name: 'Rachel', age: 30, email: 'rachel@example.com', delivered: 'yes' },
  { name: 'Samuel', age: 27, email: 'samuel@example.com', delivered: 'no' },
  { name: 'Tina', age: 42, email: 'tina@example.com', delivered: 'yes' },
  { name: 'Victor', age: 31, email: 'victor@example.com', delivered: 'no' },
  { name: 'Wendy', age: 25, email: 'wendy@example.com', delivered: 'yes' },
  { name: 'Xavier', age: 39, email: 'xavier@example.com', delivered: 'no' },
  { name: 'Yasmin', age: 28, email: 'yasmin@example.com', delivered: 'yes' },
  { name: 'Zachary', age: 33, email: 'zachary@example.com', delivered: 'no' },
];
const ch = createColumnHelper<Person>();
const columns: ColumnDef<Person, any>[] = [
  ch.accessor('name', { 
    header: 'Name', 
    cell: info => info.getValue() }),
  ch.accessor('age', { 
    header: 'Age', 
    filterFn: 'inNumberRange',        //
    meta: { filterVariant: 'range' }, // Optional values that sets a range instead of a single filter
    cell: info => info.getValue() }),
  ch.accessor('email', { 
    header: 'Email', 
    cell: info => info.getValue() }),
  ch.accessor('delivered', {
    header: 'Delivered',
    cell: info => info.getValue() === 'yes' ? '✅' : '❌',
  }),
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
    filterable: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FastTable<Person>>;

export const Default: Story = {
  args: { data, columns, width: '100%' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary' },
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

export const filterable: Story = {
  args: { ...Pageable.args, filterable: true },
};
