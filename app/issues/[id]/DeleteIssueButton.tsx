"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex className="mt-4" gap={"1"}>
          <AlertDialog.Action>
            <Button
              color={"red"}
              onClick={async () => {
                try {
                  await axios.delete(`/api/issues/${issueId}`);
                  router.push("/issues");
                  router.refresh();
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant={"soft"} color={"gray"}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
