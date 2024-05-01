import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Choose</Select.Label>
          <Select.Item value="1">User 1</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
