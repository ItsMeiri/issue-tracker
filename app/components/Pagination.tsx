import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  return (
    <Flex align={"center"} gap={"1"}>
      <Button variant="soft" color="gray" hidden={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" color="gray" hidden={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Text size={"2"}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button variant="soft" color="gray" hidden={currentPage === totalPages}>
        <ChevronRightIcon />
      </Button>
      <Button variant="soft" color="gray" hidden={currentPage === totalPages}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
