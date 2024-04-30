import React from "react";
import { Table, Text } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import { IssueActions } from "@/app/issues/list/issueActions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  // if (issues.length === 0) {
  //   return (
  //     <div className={"mx-10"}>
  //       <IssueActions />
  //       <Callout.Root color="gray"> No issues found. </Callout.Root>
  //     </div>
  //   );
  // }
  const session = await getServerSession(authOptions);
  return (
    <div className={"mx-10"}>
      {session && <IssueActions />}
      {issues.length > 0 ? (
        <Table.Root variant={"surface"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className={"hidden md:table-cell"}>
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className={"hidden md:table-cell"}>
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className={"hidden md:table-cell"}>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className={"hidden md:table-cell"}>
                  {issue.createdAt.toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text>No issues found.</Text>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
