"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState("");


  return <>
    <form
      className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      try {
        const axiosResponse = await axios.post("/api/issues", data);
        console.log(axiosResponse.data);
        router.push("/issues");
      } catch (error) {
        setError("An unexpected error occurred.");
      }
    })}
    >
      {error && <Callout.Root color="red">
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <TextField.Root
        placeholder="title"
        {...register("title")} />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button> Submit new issue</Button>
    </form>
  </>;
};
export default NewIssuePage;

