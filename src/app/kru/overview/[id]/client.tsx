"use client";

import type { User, Attendance } from "@prisma/client";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import KruHeader from "~/app/_components/kru/header";
import KruSidebar from "~/app/_components/kru/sidebar";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { ChartContainer } from "~/components/ui/chart";
import { Separator } from "~/components/ui/separator";

export default function Client({
  params,
  cakrais,
  maxAttend,
}: {
  params: { id: string };
  cakrais: (User & { attendance: Attendance[] })[];
  maxAttend: number;
}) {
  return (
    <div className="sm:py-4 sm:pl-20 px-4">
      <KruSidebar loc="home" />
      <KruHeader />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 my-4">
        {cakrais.map((cakrai) => {
          const total = maxAttend;
          const present = cakrai.attendance.filter(
            (a) => a.status === "PRESENT",
          ).length;
          const late = cakrai.attendance.filter(
            (a) => a.status === "LATE",
          ).length;
          const permits = cakrai.attendance.filter(
            (a) => a.status === "PERMITS",
          ).length;
          const absent = cakrai.attendance.filter(
            (a) => a.status === "ABSENT",
          ).length;

          return (
            <Card
              className="h-fit max-w-md rounded-2xl bg-white/20"
              x-chunk="charts-01-chunk-4"
              key={cakrai.id}
            >
              <CardHeader className='py-0 capitalize font-semibold text-violet-700 pt-4'>
                {`${cakrai.name} - ${cakrai.division.toLocaleLowerCase()}`}
              </CardHeader>
              <CardContent className="flex gap-4 p-4 pb-2">
                <ChartContainer
                  config={{
                    present: {
                      label: "Present",
                      color: "hsl(var(--chart-1))",
                    },
                    late: {
                      label: "Late",
                      color: "hsl(var(--chart-2))",
                    },
                    permits: {
                      label: "Permits",
                      color: "hsl(var(--chart-4))",
                    },
                    absent: {
                      label: "Absent",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[140px] w-full"
                >
                  <BarChart
                    margin={{
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 10,
                    }}
                    data={[
                      {
                        activity: "present",
                        value: (present / total) * 100,
                        label: `${Math.round((present / total) * 100 * 100) / 100}%`,
                        fill: "var(--color-present)",
                      },
                      {
                        activity: "late",
                        value: (late / total) * 100,
                        label: `${Math.round((late / total) * 10000) / 100}%`,
                        fill: "var(--color-late)",
                      },
                      {
                        activity: "permits",
                        value: (permits / total) * 100,
                        label: `${Math.round((permits / total) * 10000) / 100}%`,
                        fill: "var(--color-permits)",
                      },
                      {
                        activity: "absent",
                        value: (absent / total) * 100,
                        label: `${Math.round((absent / total) * 10000) / 100}%`,
                        fill: "var(--color-absent)",
                      },
                    ]}
                    layout="vertical"
                    barSize={32}
                    barGap={2}
                  >
                    <XAxis type="number" dataKey="value" hide />
                    <YAxis
                      dataKey="activity"
                      type="category"
                      tickLine={false}
                      tickMargin={4}
                      axisLine={false}
                      className="capitalize"
                    />
                    <Bar dataKey="value" radius={5}>
                      <LabelList
                        position="insideLeft"
                        dataKey="label"
                        fill="white"
                        offset={8}
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex flex-row border-t p-4">
                <div className="flex w-full items-center gap-2">
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-gray-800">Present</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-pink-700">
                      {present}
                      <span className="text-sm font-normal text-gray-800">
                        days
                      </span>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-10 w-px"
                  />
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-gray-800">Late</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-pink-700">
                      {late}
                      <span className="text-sm font-normal text-gray-800">
                        days
                      </span>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-10 w-px"
                  />
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-gray-800">Permits</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-pink-700">
                      {permits}
                      <span className="text-sm font-normal text-gray-800">
                        days
                      </span>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-10 w-px"
                  />
                  <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-gray-800">Absent</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-pink-700">
                      {absent}
                      <span className="text-sm font-normal text-gray-800">
                        days
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
