"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () =>
    handleSubmit(async (data) => {
      try {
        setIsSubmitting(true);
        const axiosResponse = await axios.post("/api/issues", data);
        console.log(axiosResponse.data);
        router.push("/issues");
      } catch (error) {
        setError("An unexpected error occurred.");
        setIsSubmitting(false);
      }
    });

  return (
    <>
      <form className="max-w-xl space-y-3" onSubmit={onSubmit()}>
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root placeholder="title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit new issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};
export default NewIssuePage;
