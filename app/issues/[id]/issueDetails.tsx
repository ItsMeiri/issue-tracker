import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

export const IssueDetails = ({ issue }: { issue: Issue }) => (
  <>
    <Heading>{issue.title}</Heading>
    <Flex gap={"3"} my={"2"}>
      <IssueStatusBadge status={issue.status} />
      <Text>{issue.createdAt.toLocaleString()}</Text>
    </Flex>
    <Card className={"prose"} mt={"4"}>
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
  </>
);
