import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/editIssueButton";
import { IssueDetails } from "@/app/issues/[id]/issueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const session = await getServerSession(AuthOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className={"md:col-span-4"}>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
