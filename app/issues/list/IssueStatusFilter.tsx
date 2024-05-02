"use client";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        status === "ALL" ? (status = "") : status;
        const query = status ? `?status=${status}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((item) => (
          <Select.Item key={item.value || "ALL"} value={item.value || "ALL"}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
