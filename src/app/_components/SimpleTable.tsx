import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';

interface SimpleTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export default function SimpleTable<TData, TValue>({
  data,
  columns,
}: SimpleTableProps<TData, TValue>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className='relative overflow-hidden rounded-xl bg-white border border-gray-200 w-full'>
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className='text-gray-700'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <div className='flex items-center justify-center w-full'>No data found</div>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
