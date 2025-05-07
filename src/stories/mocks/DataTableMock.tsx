import React, { ReactNode, useState } from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Button } from '@mantine/core';

// Mock interfaces and types
export interface ExtendedCellContext<TData, TValue> extends CellContext<TData, TValue> {
  onRowAction?: (action: string, row: TData) => void;
  onCellAction?: (action: string, row: TData) => void;
}

interface DataTableProps<TData, TValue> {
  isSelectable?: boolean;
  title?: string;
  titleClassName?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  columnVisibility?: Record<string, boolean>;
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

// Mock DataTable component for Storybook
export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  isLoading = false,
  hideTable = false,
  hideHeader = false,
  hideTableHeader = false,
  clickableRows = false,
  onRowAction,
  onCellAction,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="border rounded-md">
          <div className="h-10 border-b bg-gray-50"></div>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-16 border-b last:border-0 flex items-center px-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (hideTable) {
    return null;
  }
  
  return (
    <div className={`space-y-4 ${className || ''}`}>
      {!hideHeader && title && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      
      <div className="border rounded-md overflow-hidden">
        {!hideTableHeader && (
          <div className="bg-gray-50 border-b">
            <div className="flex px-4 py-3">
              {columns.map((column, i) => (
                <div 
                  key={i} 
                  className="flex-1 font-medium text-sm"
                  onClick={() => {
                    if (column.id) {
                      setSorting(prev => {
                        const existing = prev.find(s => s.id === column.id);
                        if (existing) {
                          return existing.desc 
                            ? prev.filter(s => s.id !== column.id)
                            : prev.map(s => s.id === column.id ? {...s, desc: true} : s);
                        }
                        // Only add to sorting state when column.id is a string
                        return [...prev, { id: column.id as string, desc: false }];
                      });
                    }
                  }}
                >
                  {column.header?.toString() || ''}
                  {sorting.find(s => s.id === column.id) && (
                    <span className="ml-1">
                      {sorting.find(s => s.id === column.id)?.desc ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          {data.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No data available
            </div>
          ) : (
            data.map((row, rowIndex) => (
              <div 
                key={rowIndex}
                className={`border-b last:border-0 flex px-4 py-3 ${
                  clickableRows ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
                onClick={() => clickableRows && onRowAction && onRowAction('click', row)}
              >
                {columns.map((column, colIndex) => {
                  const cellProps = {
                    row: { original: row },
                    onCellAction,
                  } as ExtendedCellContext<TData, TValue>;
                  
                  return (
                    <div key={colIndex} className="flex-1">
                      {column.cell 
                        ? typeof column.cell === 'function'
                          ? column.cell(cellProps)
                          : column.cell
                        : column.id 
                          ? String(row[column.id as keyof TData] || '')
                          : ''}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
      
      {data.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {currentPage * 10 + 1} to {Math.min((currentPage + 1) * 10, data.length)} of {data.length} entries
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="xs"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="xs"
              disabled={(currentPage + 1) * 10 >= data.length}
              onClick={() => setCurrentPage(p => (p + 1) * 10 < data.length ? p + 1 : p)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
