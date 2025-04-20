'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  CellContext,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { addTrailingZero, cn } from '@/lib/utils';
import { Button } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { TableSkeleton } from '@/components/ui/table-skeleton';

interface DataTableProps<TData, TValue> {
  isSelectable?: boolean;
  title?: string;
  titleClassName?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  columnVisibility?: VisibilityState;
  data: TData[];
  isLoading?: boolean;
  hideTable?: boolean;
  hideHeader?: boolean;
  hideTableHeader?: boolean;
  dataCount?: ReactNode;
  innerContent?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  tableBodyClassName?: string;
  clickableRows?: boolean;
  onRowAction?: (action: string, row: TData) => void;
  onCellAction?: (action: string, row: TData) => void;
}

export interface ExtendedCellContext<TData, TValue> extends CellContext<TData, TValue> {
  onRowAction?: (action: string, row: TData) => void;
  onCellAction?: (action: string, row: TData) => void;
}

export function DataTable<TData, TValue>({
  title,
  titleClassName,
  columns,
  data,
  columnVisibility,
  leftSection,
  rightSection,
  className,
  hideTable = false,
  hideHeader = false,
  hideTableHeader = false,
  dataCount,
  innerContent,
  headerClassName,
  footerClassName,
  tableBodyClassName,
  clickableRows = false,
  onCellAction,
  onRowAction,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 }, columnVisibility },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
  });

  const showFooter =
    table.getIsAllPageRowsSelected() ||
    table.getIsSomePageRowsSelected() ||
    table.getPageCount() > 1;

  function handleCellClick(event: React.MouseEvent, cell: any) {
    // Only stop propagation if this cell has its own action handler
    const hasCellAction =
      typeof cell.column.columnDef.cell === 'function' && cell.column.columnDef.meta?.hasCellAction;

    if (hasCellAction) {
      // Stop the click event from bubbling up to the row
      event.stopPropagation();
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-y-hidden rounded-b-xl bg-white border border-gray-100 w-full',
        className,
      )}
    >
      {!hideTable && (
        <>
          {isLoading ? (
            <TableSkeleton
              columnCount={columns.length}
              rowCount={4}
              hasHeader={!hideTableHeader}
            />
          ) : (
            <div className={cn('', className)}>
              <Table>
                {hideTableHeader == false && (
                  <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                )}
                <TableBody className={tableBodyClassName}>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className={cn(clickableRows && onRowAction && 'cursor-pointer')}
                        onClick={e => {
                          if (clickableRows && onRowAction) {
                            onRowAction('row-click', row.original);
                          }
                        }}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            onClick={e => handleCellClick(e, cell)}
                          >
                            {typeof cell.column.columnDef.cell === 'function'
                              ? cell.column.columnDef.cell({
                                  ...cell.getContext(),
                                  onCellAction,
                                } as ExtendedCellContext<TData, TValue>)
                              : cell.column.columnDef.cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center'
                      >
                        No data.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      {hideTable == true && innerContent && <>{innerContent}</>}

      {showFooter && (
        <div
          id='footer'
          className={cn(
            'text-sm flex items-center justify-between py-3 px-6 border-t border-gray-100 text-slate-700 font-normal',
            footerClassName,
          )}
        >
          {table.getIsSomePageRowsSelected() || table.getIsAllRowsSelected() ? (
            <p>
              {' '}
              {table.getSelectedRowModel().rows.length} row(s) out of{' '}
              {table.getRowModel().rows.length}
            </p>
          ) : (
            <p>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </p>
          )}
          <div className='flex items-center space-x-3'>
            <Button
              variant='default'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='default'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
