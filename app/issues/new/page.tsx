"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();


  return <form
    className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
    const axiosResponse = await axios.post("/api/issues", data);
    console.log(axiosResponse.data);
    router.push("/issues");
  })}
  >
    <TextField.Root
      placeholder="title"
      {...register("title")} />
    <Controller
      name="description"
      control={control}
      render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
    />
    <Button> Submit new issue</Button>
  </form>;
};
export default NewIssuePage;

