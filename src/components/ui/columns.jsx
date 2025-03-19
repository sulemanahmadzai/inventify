export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <span>{row.original.stock} units</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status === "low-stock"
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];
