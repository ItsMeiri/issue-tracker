"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/issueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};
export default NewIssuePage;
