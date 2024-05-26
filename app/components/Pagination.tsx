"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align={"center"} gap={"1"}>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size={"2"}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
