import { ColumnDef } from '@tanstack/react-table';

interface Meeting {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  resources: string;
}

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <span className="font-medium">{row.getValue('title')}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <span className="line-clamp-3 text-gray-500">{row.getValue('description')}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date & Time',
    cell: ({ row }) => {
      const meeting = row.original;
      return (
        <div>
          <div>{meeting.date}</div>
          <div className="text-gray-500 whitespace-nowrap">{`${meeting.startTime} - ${meeting.endTime}`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      // Logic màu sắc cho badge
      const badgeColors = {
        Scheduled: 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        Completed: 'bg-green-100 text-green-800',
      };

      return <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${badgeColors[status as keyof typeof badgeColors]}`}>{status}</span>;
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const meeting = row.original;
      return (
        <div className="flex items-center gap-4">
          <button onClick={() => window.open(meeting.resources, '_blank')} className="text-green-600 hover:text-green-800">
            View
          </button>
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </div>
      );
    },
  },
];
