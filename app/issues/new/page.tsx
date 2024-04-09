"use client";
import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="title"/>
      <TextArea placeholder="description"/>
      <Button> Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;