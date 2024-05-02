"use client";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statuses: {
  label: string;
  value?: Status;
}[] = [
  { label: "Open", value: "OPEN" },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  { label: "Closed", value: "CLOSED" },
  { label: "All" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((item) => (
          <Select.Item key={item.value} value={item.value || "ALL"}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
