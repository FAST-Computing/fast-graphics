'use client';

import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';

import { useState } from 'react';
import type React from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
} from '@tanstack/react-table';

/** Merge MUI palette types into Emotion's theme so styled can access palette. */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}


export type FastTableColor = 'primary' | 'secondary';

export interface FastTableProps<T extends RowData> {
  /** Row data */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T, any>[];
  /** Which palette color to use for headers. Text auto-contrasts. */
  color?: FastTableColor;
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
  /** Enable global text search across all columns. */
  searchable?: boolean;
  /** Enable per-column text filtering via inputs in the header row. 
   * NOTE: needs "filterFn: 'includesString'"" in the data's columnHelper info on numerical values.*/
  filterable?: boolean;
  /** Optional function that renders action buttons per row. */
  renderActions?: (row: T) => React.ReactNode;
  /** Header text for the actions column. Default "Actions". */
  actionsHeader?: string;
}


export function FastTable<T extends RowData>({
  data,
  columns,
  color = 'primary',
  hoverable = true,
  striped = true,
  width = '100%',
  sortable = false,
  pageable = false,
  defaultPageSize = 5,
  searchable = false,
  filterable = false,
  renderActions,
  actionsHeader = 'Actions',
}: FastTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: sortable,
  });

  return (
    <StyledWrapper $color={color} $w={width} $hoverable={hoverable} $striped={striped} $sortable={sortable}>
      {pageable && (
        <PaginationBar>
          <PageSizeGroup>
            {searchable && (
              <SearchInput
                type="text"
                placeholder="Search…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            )}
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
              {renderActions && <th className="actions-header">{actionsHeader}</th>}
            </tr>
          ))}
          {filterable && (
            <tr className="filter-row">
              {table.getHeaderGroups()[0]?.headers.map((header) => {
                const meta = (header.column.columnDef as any).meta;
                const isRange = meta?.filterVariant === 'range';
                const fv = header.column.getFilterValue() as any;

                if (isRange) {
                  const fvArr = Array.isArray(fv) ? fv : [undefined, undefined];
                  const [min, max] = fvArr;
                  return (
                    <th key={header.id}>
                      <RangeGroup>
                        <RangeInput
                          type="number"
                          placeholder="Min"
                          value={min ?? ''}
                          onChange={(e) => header.column.setFilterValue([e.target.value, max])}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <RangeSep>–</RangeSep>
                        <RangeInput
                          type="number"
                          placeholder="Max"
                          value={max ?? ''}
                          onChange={(e) => header.column.setFilterValue([min, e.target.value])}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </RangeGroup>
                    </th>
                  );
                }

                return (
                  <th key={header.id}>
                    <FilterInput
                      type="text"
                      placeholder={`Filter ${typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : ''}`}
                      value={(header.column.getFilterValue() as string) || ''}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </th>
                );
              })}
              {renderActions && <th />}
            </tr>
          )}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {renderActions && (
                <td className="actions-cell">
                  {renderActions(row.original)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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

  .actions-header {
    text-align: center;
  }

  .actions-cell {
    text-align: center;
    white-space: nowrap;
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

  .filter-row th {
    padding: 6px 8px;
    vertical-align: top;
  }
`;

const SortIndicator = styled('span')`
  font-size: 0.65rem;
  margin-left: 4px;
`;

const FilterInput = styled('input')`
  width: 100%;
  padding: 5px 6px;
  border: 1px solid ${p => p.theme.palette.divider};
  font-family: inherit;
  font-size: 0.75rem;
  color: ${p => p.theme.palette.text.primary};
  background: ${p => p.theme.palette.background.paper};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${p => p.theme.palette.primary.main};
  }

  &::placeholder {
    color: ${p => p.theme.palette.text.secondary};
  }
`;

const RangeGroup = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RangeSep = styled('span')`
  color: ${p => p.theme.palette.text.secondary};
  font-size: 0.75rem;
  flex-shrink: 0;
`;

const RangeInput = styled('input')`
  width: 100%;
  padding: 5px 6px;
  border: 1px solid ${p => p.theme.palette.divider};
  font-family: inherit;
  font-size: 0.75rem;
  color: ${p => p.theme.palette.text.primary};
  background: ${p => p.theme.palette.background.paper};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${p => p.theme.palette.primary.main};
  }

  &::placeholder {
    color: ${p => p.theme.palette.text.secondary};
  }

  /* Hide native number spinners */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PaginationBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
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
  font-size: 0.8125rem;
  background: ${(p) => p.theme.palette.background.paper};
  color: ${(p) => p.theme.palette.text.primary};
  cursor: pointer;
`;

const SearchInput = styled('input')`
  margin-right: 16px;
  padding: 4px 10px;
  border: 1px solid ${(p) => p.theme.palette.divider};
  font-size: 0.8125rem;
  font-family: inherit;
  background: ${(p) => p.theme.palette.background.paper};
  color: ${(p) => p.theme.palette.text.primary};
  outline: none;
  width: 200px;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${(p) => p.theme.palette.primary.main};
  }

  &::placeholder {
    color: ${(p) => p.theme.palette.text.secondary};
  }
`;

const NavGroup = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NavButton = styled('button')`
  padding: 4px 10px;
  border: 1px solid ${(p) => p.theme.palette.divider};
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
