"use client";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (orderBy) params.append("orderBy", orderBy);
        status === "ALL" ? (status = "") : status;
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
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
