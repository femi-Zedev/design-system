import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTable,
  ExtendedCellContext,
} from "../../app/_components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { withMantine } from "../../../.storybook/decorators";
import { Badge } from "@mantine/core";

/**
 * The DataTable component is a powerful and flexible table implementation built on top of TanStack Table (react-table v8).
 * It provides a complete solution for displaying tabular data with features like sorting, pagination, custom cell rendering, and row actions.
 * 
 * ## Features
 * 
 * - Sorting
 * - Pagination
 * - Custom cell rendering
 * - Row selection
 * - Row and cell actions
 * - Loading states with skeleton UI
 * - Customizable styling
 * 
 * ## Usage
 * 
 * ```tsx
 * import { DataTable } from '@/app/_components/DataTable';
 * import { ColumnDef } from '@tanstack/react-table';
 * 
 * // Define columns
 * const columns: ColumnDef<Person, any>[] = [
 *   {
 *     accessorKey: 'name',
 *     header: 'Name',
 *   },
 *   {
 *     accessorKey: 'email',
 *     header: 'Email',
 *   },
 * ];
 * 
 * // Use the component
 * <DataTable
 *   columns={columns}
 *   data={people}
 * />
 * ```
 */

// Example data type
type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

// Example data
const people: Person[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    status: "inactive",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Designer",
    status: "inactive",
  },
];

// Basic columns
const basicColumns: ColumnDef<Person, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

// Advanced columns with custom cell rendering
const advancedColumns: ColumnDef<Person, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        color={row.original.status === "active" ? "green" : "gray"}
        variant="light"
      >
        {row.original.status}
      </Badge>
    ),
    meta: {
      hasCellAction: true,
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, onCellAction }: ExtendedCellContext<Person, any>) => {
      return (
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => onCellAction && onCellAction("view", row.original)}
        >
          View
        </button>
      );
    },
    meta: {
      hasCellAction: true,
    },
  },
];

// Define the component with explicit generic types
const DataTableWithTypes = DataTable as typeof DataTable<Person, any>;

const meta = {
  title: "Components/DataTable",
  component: DataTableWithTypes,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible and customizable data table component built on top of TanStack Table (react-table).",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: "Array of column definitions for the table",
      control: "object",
    },
    data: {
      description: "Array of data to display in the table",
      control: "object",
    },
    isLoading: {
      description: "Shows a loading skeleton when true",
      control: "boolean",
    },
    clickableRows: {
      description: "Makes rows clickable when true",
      control: "boolean",
    },
    hideTable: {
      description: "Hides the table when true",
      control: "boolean",
    },
    hideTableHeader: {
      description: "Hides the table header row when true",
      control: "boolean",
    },
    className: {
      description: "Additional CSS class for the table container",
      control: "text",
    },
    headerClassName: {
      description: "Additional CSS class for the header section",
      control: "text",
    },
    footerClassName: {
      description: "Additional CSS class for the footer section",
      control: "text",
    },
    tableBodyClassName: {
      description: "Additional CSS class for the table body",
      control: "text",
    },
  },
  decorators: [withMantine],
} satisfies Meta<typeof DataTableWithTypes>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic example of the DataTable component with simple columns and data.
 */
export const Basic: Story = {
  args: {
    columns: basicColumns,
    data: people,
  },
};

/**
 * Example showing the loading state with skeleton UI.
 */
export const Loading: Story = {
  args: {
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        header: "Actions",
      },
    ],
    data: [],
    isLoading: true,
  },
};

/**
 * Example with custom cell rendering for status and actions.
 */
export const WithCustomCells: Story = {
  args: {
    columns: advancedColumns,
    data: people,
  },
};

/**
 * Example demonstrating row and cell actions with event logging.
 */
export const WithRowActions: Story = {
  render: function WithRowActionsRenderer(args) {
    const [actionLog, setActionLog] = useState<string[]>([]);

    const handleRowAction = (action: string, row: Person) => {
      setActionLog((prev) => [...prev, `Row action: ${action} on ${row.name}`]);
    };

    const handleCellAction = (action: string, row: Person) => {
      setActionLog((prev) => [
        ...prev,
        `Cell action: ${action} on ${row.name}`,
      ]);
    };

    return (
      <div className="space-y-4">
        <DataTable<Person, any>
          {...args}
          clickableRows={true}
          onRowAction={handleRowAction}
          onCellAction={handleCellAction}
        />
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Action Log</h3>
          {actionLog.length > 0 ? (
            <ul className="text-sm space-y-1">
              {actionLog.map((log, index) => (
                <li key={index} className="text-gray-600">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Click on a row or action button to see events
            </p>
          )}
        </div>
      </div>
    );
  },
  args: {
    columns: advancedColumns,
    data: people,
  },
};

/**
 * Example showing the empty state message when there's no data.
 */
export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

/**
 * Example showing the table with the header row hidden.
 */
export const HiddenTableHeader: Story = {
  args: {
    columns: basicColumns,
    data: people,
    hideTableHeader: true,
  },
};
