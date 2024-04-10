"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");


  return <>
    <form
      className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      try {
        const axiosResponse = await axios.post("/1api/issues", data);
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
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="description" {...field} />}
      />
      <Button> Submit new issue</Button>
    </form>
  </>;
};
export default NewIssuePage;

