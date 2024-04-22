"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import { Submit } from "@radix-ui/react-form";

type IssueFormData = z.infer<typeof IssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    return handleSubmit(async (data) => {
      try {
        setIsSubmitting(true);
        if (issue) {
          await axios.patch(`/api/issues/${issue.id}`, data);
        } else {
          await axios.post("/api/issues", data);
        }
        router.push("/issues");
      } catch (error) {
        setError("An unexpected error occurred.");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <form className="max-w-xl space-y-3" onSubmit={onSubmit()}>
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};
export default IssueForm;
