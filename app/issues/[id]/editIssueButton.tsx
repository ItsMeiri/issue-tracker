import { Button } from "@radix-ui/themes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil1Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};
export default EditIssueButton;
