import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import { IssueActions } from "@/app/issues/list/issueActions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {
  IssuesQuery,
  columnNames,
} from "@/app/issues/list/IssueTable";

interface SearchProps {
  searchParams: IssuesQuery;
}

const IssuesPage = async ({ searchParams }: SearchProps) => {
  searchParams.status && // check if the status property is defined
  ["OPEN", "IN_PROGRESS", "CLOSED"].includes(searchParams.status) // check if the status value is in the array
    ? searchParams.status // if it is, assign it to the searchParams object
    : (searchParams.status = undefined); // if not, assign undefined to the status property

  const orderBy =
    searchParams.orderBy && // check if the orderBy value is defined
    columnNames.includes(searchParams.orderBy) // check if the orderBy value is
      ? // in the columns array
        { [searchParams.orderBy]: "asc" } // if it is, return the orderBy object
      : undefined; // if not, return undefined

  const whereFilter = { status: searchParams.status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10; // hardcoded page size for now
  const issues = await prisma.issue.findMany({
    where: whereFilter,

    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: whereFilter });

  // if (issueslength === 0) {
  //   return (
  //     <div className={"mx-10"}>
  //       <IssueActions />
  //       <Callout.Root color="gray"> No issues found. </Callout.Root>
  //     </div>
  //   );
  // }
  const session = await getServerSession(authOptions);
  return (
    <Flex className={"mx-10"} direction={"column"} gap={"3"}>
      {session && <IssueActions />}
      {issues.length > 0 ? (
        <IssueTable issues={issues} searchParams={searchParams} />
      ) : (
        <Text>No issues found.</Text>
      )}
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all issues in the issue tracker",
};
