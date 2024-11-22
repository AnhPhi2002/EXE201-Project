import { ColumnDef } from "@tanstack/react-table";

interface Room {
  _id: string;
  title: string;
  description: string;
  meetLink: string;
  startTime: string;
  endTime: string;
}

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div
        className="font-medium text-gray-900 text-ellipsis overflow-hidden line-clamp-3 max-w-[200px]"
        title={row.getValue("title")}
      >
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div
        className="text-gray-500 text-ellipsis overflow-hidden line-clamp-3 max-w-[250px]"
        title={row.getValue("description")}
      >
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => new Date(row.getValue("startTime")).toLocaleString(),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => new Date(row.getValue("endTime")).toLocaleString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => null,
  },
];
