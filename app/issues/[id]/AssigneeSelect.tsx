"use client";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import { toast, Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  function handleValueChange(value: string) {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: value === "unassigned" ? null : value,
      })
      .catch((err) => {
        toast.error("Error assigning issue");
      });
  }

  if (isLoading) return <Skeleton height={"2rem"} />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Assign to" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Choose</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });
export default AssigneeSelect;
