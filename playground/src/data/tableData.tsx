import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

export type Cat = {
  name: string;
  breed: string;
  age: number; // in human years
  napHours: number; // per day
  temperament: string;
  zoomiesProgress: number; // percentage completed for the day
};

export const defaultData: Cat[] = [
  { name: 'Whiskers', breed: 'Tabby', age: 3, napHours: 16, temperament: 'Affectionate', zoomiesProgress: 90 },
  { name: 'Garfield', breed: 'Persian', age: 7, napHours: 22, temperament: 'Lazy', zoomiesProgress: 5 },
  { name: 'Luna', breed: 'Siamese', age: 2, napHours: 14, temperament: 'Vocal', zoomiesProgress: 100 },
  { name: 'Simba', breed: 'Maine Coon', age: 5, napHours: 15, temperament: 'Gentle Giant', zoomiesProgress: 60 },
  { name: 'Felix', breed: 'Tuxedo', age: 4, napHours: 18, temperament: 'Mischievous', zoomiesProgress: 85 },
  { name: 'Oliver', breed: 'British Shorthair', age: 6, napHours: 17, temperament: 'Calm', zoomiesProgress: 40 },
  { name: 'Bella', breed: 'Ragdoll', age: 1, napHours: 19, temperament: 'Floppy & Sweet', zoomiesProgress: 75 },
  { name: 'Loki', breed: 'Sphynx', age: 3, napHours: 13, temperament: 'Chaotic energetic', zoomiesProgress: 95 },
  { name: 'Chloe', breed: 'Calico', age: 8, napHours: 16, temperament: 'Sassy', zoomiesProgress: 50 },
  { name: 'Salem', breed: 'Bombay', age: 10, napHours: 20, temperament: 'Sassy Wizard', zoomiesProgress: 30 },
];

const columnHelper = createColumnHelper<Cat>();

export const defaultColumns: ColumnDef<Cat, any>[] = [
  columnHelper.accessor('name', {
    header: 'Cat Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('breed', {
    header: 'Breed',
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: 'Age (Years)',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('napHours', {
    header: 'Daily Nap Hours',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('temperament', {
    header: 'Temperament',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('zoomiesProgress', {
    header: 'Zoomies Progress (%)',
    footer: (info) => info.column.id,
  }),
];