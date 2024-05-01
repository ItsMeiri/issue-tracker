import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { z } from "zod";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: z.infer<typeof patchIssueSchema> = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { assignedToUserId, description, title } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  const updatedIssue = await prisma.issue
    .update({
      where: { id: parseInt(params.id) },
      data: {
        title: title,
        description: description,
        assignedToUserId: assignedToUserI,
      ,
    })
    .catch((e) => {
      console.log(e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 400 ,
      );
    });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  {
    params
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Issue deleted", ok: true });
}
