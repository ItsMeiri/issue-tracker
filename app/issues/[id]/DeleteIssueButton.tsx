"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setError(false);
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (e) {
      setIsDeleting(false);
      setError(true);
      console.log(e);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue?
          </AlertDialog.Description>
          <Flex className="mt-4" gap={"1"}>
            <AlertDialog.Action>
              <Button color={"red"} onClick={handleDelete}>
                Delete Issue
                {isDeleting && <Spinner />}
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

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            An error occurred while deleting the issue.
          </AlertDialog.Description>
          <Button
            color={"gray"}
            variant={"soft"}
            mt={"2"}
            onClick={() => setError(false)}
          >
            Close
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
