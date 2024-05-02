import React from "react";
import { Table, Text } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import { IssueActions } from "@/app/issues/list/issueActions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface SearchProps {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
  };
}

const IssuesPage = async ({ searchParams }: SearchProps) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  searchParams.status &&
  ["OPEN", "IN_PROGRESS", "CLOSED"].includes(searchParams.status)
    ? searchParams.status
    : (searchParams.status = undefined);

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
  });

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
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column?.className}
                >
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className={"inline"} />
                  )}
                </Table.ColumnHeaderCell>
              ))}
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
