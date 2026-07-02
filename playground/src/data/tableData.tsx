import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const defaultData: Person[] = [
  { firstName: 'tanner', lastName: 'linsley', age: 24, visits: 100, status: 'In Relationship', progress: 50 },
  { firstName: 'tandy', lastName: 'miller', age: 40, visits: 40, status: 'Single', progress: 80 },
  { firstName: 'joe', lastName: 'dirte', age: 45, visits: 20, status: 'Complicated', progress: 10 },
  { firstName: 'alice', lastName: 'wonder', age: 28, visits: 75, status: 'Married', progress: 90 },
  { firstName: 'bob', lastName: 'builder', age: 35, visits: 55, status: 'Single', progress: 65 },
  { firstName: 'charlie', lastName: 'brown', age: 31, visits: 12, status: 'Single', progress: 25 },
  { firstName: 'diana', lastName: 'prince', age: 32, visits: 150, status: 'In Relationship', progress: 95 },
  { firstName: 'ethan', lastName: 'hunt', age: 42, visits: 85, status: 'Complicated', progress: 40 },
  { firstName: 'fiona', lastName: 'shrek', age: 29, visits: 60, status: 'Married', progress: 70 },
  { firstName: 'gordon', lastName: 'ramsay', age: 55, visits: 210, status: 'Married', progress: 85 },
];

const columnHelper = createColumnHelper<Person>();

export const defaultColumns: ColumnDef<Person, any>[] = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
];
