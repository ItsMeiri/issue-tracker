"use client";
import { Card, Theme } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import theme from "tailwindcss/defaultTheme";

interface IssueChartProps {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueChart = ({ open, closed, inProgress }: IssueChartProps) => {
  const data = [
    {
      label: "open",
      value: open,
    },
    {
      label: "in progress",
      value: inProgress,
    },
    {
      label: "closed",
      value: closed,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey={"value"}
            barSize={50}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
