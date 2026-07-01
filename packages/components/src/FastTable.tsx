'use client';

import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

import { useState } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type PaginationState,
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
  { firstName: 'charlie', lastName: 'brown', age: 31, visits: 12, status: 'Single', progress: 25 },
  { firstName: 'diana', lastName: 'prince', age: 32, visits: 150, status: 'In Relationship', progress: 95 },
  { firstName: 'ethan', lastName: 'hunt', age: 42, visits: 85, status: 'Complicated', progress: 40 },
  { firstName: 'fiona', lastName: 'shrek', age: 29, visits: 60, status: 'Married', progress: 70 },
  { firstName: 'gordon', lastName: 'ramsay', age: 55, visits: 210, status: 'Married', progress: 85 }
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
  /** Enable column sorting via header click */
  sortable?: boolean;
  /** Enable pagination controls */
  pageable?: boolean;
  /** Default page size (used when pageable) */
  defaultPageSize?: number;
}


export function FastTable<T extends RowData>({
  data,
  columns,
  color = 'primary',
  showFooter = false,
  hoverable = true,
  striped = true,
  width = '100%',
  sortable = false,
  pageable = false,
  defaultPageSize = 10,
}: FastTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const resolvedData = (data ?? defaultData) as T[];
  const resolvedColumns = columns ?? (defaultColumns as unknown as ColumnDef<T, any>[]);

  const table = useReactTable({
    data: resolvedData,
    columns: resolvedColumns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: sortable,
  });

  return (
    <StyledWrapper $color={color} $w={width} $hoverable={hoverable} $striped={striped} $sortable={sortable}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {sortable && (
                    <SortIndicator>
                      {{
                        asc: ' ▲',
                        desc: ' ▼',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </SortIndicator>
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
      {pageable && (
        <PaginationBar>
          <PageSizeGroup>
            <PageSizeLabel>Show</PageSizeLabel>
            <PageSizeSelect
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </PageSizeSelect>
            <PageSizeLabel>elements</PageSizeLabel>
          </PageSizeGroup>

          <NavGroup>
            <NavButton
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </NavButton>
            <NavButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </NavButton>

            <PageInfo>
              Page{' '}
              <PageInput
                type="number"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />{' '}
              of {table.getPageCount()}
            </PageInfo>

            <NavButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </NavButton>
            <NavButton
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </NavButton>
          </NavGroup>
        </PaginationBar>
      )}
    </StyledWrapper>
  );
}


const StyledWrapper = styled('div')<{
  $color: FastTableColor;
  $w: number | string;
  $hoverable: boolean;
  $striped: boolean;
  $sortable: boolean;
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
    ${(p) => p.$sortable && 'cursor: pointer; user-select: none;'}
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

const SortIndicator = styled('span')`
  font-size: 0.65rem;
  margin-left: 4px;
`;

const PaginationBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 0.8125rem;
  color: ${(p) => p.theme.palette.text.secondary};
  border-top: 1px solid ${(p) => p.theme.palette.divider};
  flex-wrap: wrap;
  gap: 12px;
`;

const PageSizeGroup = styled('div')`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PageSizeLabel = styled('span')`
  white-space: nowrap;
`;

const PageSizeSelect = styled('select')`
  padding: 4px 8px;
  border: 1px solid ${(p) => p.theme.palette.divider};
  border-radius: 4px;
  font-size: 0.8125rem;
  background: ${(p) => p.theme.palette.background.paper};
  color: ${(p) => p.theme.palette.text.primary};
  cursor: pointer;
`;

const NavGroup = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NavButton = styled('button')`
  padding: 4px 10px;
  border: 1px solid ${(p) => p.theme.palette.divider};
  border-radius: 4px;
  background: ${(p) => p.theme.palette.background.paper};
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: ${(p) => p.theme.palette.action.hover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const PageInfo = styled('span')`
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  padding: 0 8px;
`;

const PageInput = styled('input')`
  width: 48px;
  padding: 4px 6px;
  border: 1px solid ${(p) => p.theme.palette.divider};
  border-radius: 4px;
  font-size: 0.8125rem;
  text-align: center;
  background: ${(p) => p.theme.palette.background.paper};
  color: ${(p) => p.theme.palette.text.primary};

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
