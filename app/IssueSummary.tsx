import { Card, Flex, Text } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import Link from "next/link";

interface IssueSummaryProps {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: IssueSummaryProps) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
    { label: "Issues in progress", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap={"4"} justify={"between"}>
      {statuses.map(({ label, value, status }) => (
        <Card key={label}>
          <Flex direction={"column"} gap={"2"}>
            <Link
              className={"text-sm font-medium"}
              href={`/issues/list?status=${status}`}
            >
              {label}
            </Link>
            <Text size={"5"} weight={"bold"}>
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
