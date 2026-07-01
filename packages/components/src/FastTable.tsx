'use client';

import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';

/** Merge MUI palette types into Emotion's theme so styled can access palette. */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}


/* ------ SAMPLE DATA AND STRUCTURE ------*/

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  { firstName: 'tanner', lastName: 'linsley', age: 24, visits: 100, status: 'In Relationship', progress: 50 },
  { firstName: 'tandy', lastName: 'miller', age: 40, visits: 40, status: 'Single', progress: 80 },
  { firstName: 'joe', lastName: 'dirte', age: 45, visits: 20, status: 'Complicated', progress: 10 },
  { firstName: 'alice', lastName: 'wonder', age: 28, visits: 75, status: 'Married', progress: 90 },
  { firstName: 'bob', lastName: 'builder', age: 35, visits: 55, status: 'Single', progress: 65 },
];

const columnHelper = createColumnHelper<Person>();

const defaultColumns: ColumnDef<Person, any>[] = [
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

/* ----------------------------------------------*/


export type FastTableColor = 'primary' | 'secondary';

export interface FastTableProps<T extends RowData> {
  /** Row data */
  data?: T[];
  /** Column definitions */
  columns?: ColumnDef<T, any>[];
  /** Which palette color to use for headers. Text auto-contrasts. */
  color?: FastTableColor;
  /** Show footer row */
  showFooter?: boolean;
  /** Highlight row on hover */
  hoverable?: boolean;
  /** Alternate row background */
  striped?: boolean;
  /** Table width */
  width?: number | string;
}


export function FastTable<T extends RowData>({
  data,
  columns,
  color = 'primary',
  showFooter = false,
  hoverable = true,
  striped = true,
  width = '100%',
}: FastTableProps<T>) {
  const resolvedData = (data ?? defaultData) as T[];
  const resolvedColumns = columns ?? (defaultColumns as unknown as ColumnDef<T, any>[]);

  const table = useReactTable({
    data: resolvedData,
    columns: resolvedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledWrapper $color={color} $w={width} $hoverable={hoverable} $striped={striped}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {showFooter && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </StyledWrapper>
  );
}


const StyledWrapper = styled('div')<{
  $color: FastTableColor;
  $w: number | string;
  $hoverable: boolean;
  $striped: boolean;
}>`
  width: ${(p) => (typeof p.$w === 'number' ? `${p.$w}px` : p.$w)};
  overflow-x: auto;
  font-family: ${(p) => p.theme.typography.fontFamily};

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  thead {
    background-color: ${(p) => (p.theme.palette[p.$color] as PaletteColor).main};
    color: ${(p) => (p.theme.palette[p.$color] as PaletteColor).contrastText};
  }

  th {
    padding: 12px 16px;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  td {
    padding: 10px 16px;
    font-size: 0.875rem;
    color: ${(p) => p.theme.palette.text.primary};
    border-bottom: 1px solid ${(p) => p.theme.palette.divider};
  }

  tbody tr {
    transition: background-color 0.2s ease;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  ${(p) =>
    p.$striped &&
    `
    tbody tr:nth-child(even) {
      background-color: ${p.theme.palette.action.hover};
    }
  `}

  ${(p) =>
    p.$hoverable &&
    `
    tbody tr:hover {
      background-color: ${p.theme.palette.action.selected};
    }
  `}

  tfoot {
    background-color: ${(p) => p.theme.palette.action.hover};
  }

  tfoot th {
    padding: 8px 16px;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${(p) => p.theme.palette.text.secondary};
    border-top: 1px solid ${(p) => p.theme.palette.divider};
  }
`;
