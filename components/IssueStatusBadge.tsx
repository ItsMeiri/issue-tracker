import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  CLOSED: {
    label: "Closed",
    color: "green",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "violet",
  },
  OPEN: {
    label: "Open",
    color: "red",
  },
};

export const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
