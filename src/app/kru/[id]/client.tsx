"use client";

import { ListFilter, PartyPopper, PlusCircle, Stamp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KruSidebar from "@/app/_components/kru/sidebar";
import { useId, useState } from "react";
import KruTable from "@/app/_components/kru/table";
import { useToggle } from "@/hooks/useToggle";
import KruHeader from "@/app/_components/kru/header";
import type { Attendance, User } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

export default function Kru({
  params,
  cakrais,
  maxAttend,
}: {
  params: { id: string };
  cakrais: (User & { attendance: Attendance[] })[];
  maxAttend: number;
}) {
  const data = cakrais.map((cakrai) => {
    return {
      name: cakrai.name ?? cakrai.uname,
      division: cakrai.division,
      totalAttendance: cakrai.attendance.filter(
        ({ status }) => status === "PRESENT" || status === "LATE",
      ).length,
      attendance:
        (cakrai.attendance.filter(
          ({ status }) => status === "PRESENT" || status === "LATE",
        ).length /
          maxAttend) *
        100,
      updatedAt: cakrai.updatedAt.toLocaleString(),
      id: cakrai.id,
      isAttending: !cakrai.attendance.some(
        (data) => data.date === new Date().toISOString().slice(0, 10),
      ),
      desc: cakrai.attendance.find(
        (data) => data.date === new Date().toISOString().slice(0, 10),
      )?.status,
    };
  });
  const id = params.id;

  const [page, setPage] = useState(1);
  const [low, toggleLow, setLow] = useToggle(true);
  const [mod, toggleMod, setMod] = useToggle(true);
  const [high, toggleHigh, setHigh] = useToggle(true);
  const [division, setDivision] = useState<string>("all");
  const lowerBound = low ? 0 : mod ? 50 : high ? 75 : 100;
  const upperBound = high ? 100 : mod ? 75 : low ? 50 : 0;
  const filteredData = data.filter((cakrai) => {
    if (division === "all" && lowerBound === 0 && upperBound === 100)
      return true;
    return (
      (cakrai.division.toLowerCase() === division || division === "all") &&
      cakrai.attendance >= lowerBound &&
      cakrai.attendance <= upperBound
    );
  });
  const lastpage = Math.ceil(filteredData.length / 9);

  const [active, setActive] = useState<string | null>(null);
  const userActive =
    typeof active === "string"
      ? cakrais.find(({ name }) => name === active)
      : undefined;

  const present =
    userActive?.attendance.filter((a) => a.status === "PRESENT").length ?? 0;
  const late =
    userActive?.attendance.filter((a) => a.status === "LATE").length ?? 0;
  const absent =
    userActive?.attendance.filter((a) => a.status === "ABSENT").length ?? 0;
  const permits =
    userActive?.attendance.filter((a) => a.status === "PERMITS").length ?? 0;
  const total = maxAttend;
  const ids = useId();

  return (
    <div className="relative flex min-h-dvh w-full flex-col">
      <AnimatePresence>
        {active && typeof active === "string" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "string" && (
          <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
            <motion.div
              layoutId={`modal-${ids}`}
              className="pointer-events-auto flex w-full max-w-[min(32rem,90vw)] flex-col overflow-hidden rounded-2xl border-2 border-violet-500 bg-white/5 p-4 shadow-lg"
            >
              <div className="relative flex w-full flex-col gap-6 px-2 py-2 md:px-12 md:py-6">
                <div className="grid grid-flow-row grid-cols-2 grid-rows-2 gap-x-4 gap-y-4 md:grid-flow-col">
                  <div className="col-span-2 space-y-1 rounded-2xl border border-violet-200 bg-white/20 p-6 text-violet-600 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">Name</h2>
                      <Star />
                    </div>
                    <motion.h1
                      layoutId={`name-${active + ids + division}`}
                      className="text-lg font-bold text-violet-800"
                    >
                      {userActive?.name}
                    </motion.h1>
                  </div>
                  <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 px-4 py-6 text-violet-600 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">Division</h2>
                      <PartyPopper />
                    </div>
                    <motion.h1
                      layoutId={`division-${active + ids + division}`}
                      className="text-lg font-bold capitalize text-violet-800"
                    >
                      {userActive?.division.toLowerCase()}
                    </motion.h1>
                  </div>
                  <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 px-4 py-6 text-violet-600 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">Status</h2>
                      <Stamp />
                    </div>
                    <motion.h1 layoutId={`cakrai-${ids+page+division}`} className="text-lg font-bold text-violet-800">
                      Cakrai
                    </motion.h1>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-6 md:h-full md:flex-row">
                  <Card
                    className="h-fit w-full max-w-md rounded-2xl bg-white/20"
                    x-chunk="charts-01-chunk-4"
                  >
                    <CardHeader className="border-b p-4 text-lg font-semibold text-violet-600">
                      <p>
                        <span className="">Today</span> :{" "}
                        <motion.span
                          layoutId={`status-${active + ids + division}`}
                          className="font-bold text-violet-700"
                        >
                          {data.find(({ name }) => name === active)?.desc ?? "UNKNOWN"}
                        </motion.span>
                      </p>
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
                              label: `${Math.round((present / total) * 100 * 100)}%`,
                              fill: "var(--color-present)",
                            },
                            {
                              activity: "late",
                              value: (late / total) * 100,
                              label: `${Math.round((late / total) * 10000)}%`,
                              fill: "var(--color-late)",
                            },
                            {
                              activity: "permits",
                              value: (permits / total) * 100,
                              label: `${Math.round((permits / total) * 10000)}%`,
                              fill: "var(--color-permits)",
                            },
                            {
                              activity: "absent",
                              value: (absent / total) * 100,
                              label: `${Math.round((absent / total) * 10000)}%`,
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
                      <div className="flex w-full items-center gap-1 md:gap-2">
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
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <KruSidebar loc="home" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <KruHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => {
              setDivision(value);
              setPage(1);
            }}
          >
            <div className="flex items-center">
              <TabsList className="bg-muted/40">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="mechanic">Mechanic</TabsTrigger>
                <TabsTrigger value="control">Control</TabsTrigger>
                <TabsTrigger value="manager">Manager</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by Attendance
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by attendance</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={low && high && mod}
                      onClick={() => {
                        if (low && high && mod) {
                          setLow(false);
                          setMod(false);
                          setHigh(false);
                        } else {
                          setLow(true);
                          setMod(true);
                          setHigh(true);
                        }
                      }}
                    >
                      ALL
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={low} onClick={toggleLow}>
                      <strong className="mr-2 text-red-600">low</strong>
                      {"0% - 50%"}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={mod} onClick={toggleMod}>
                      <strong className="mr-2 text-yellow-500">mod</strong>
                      {"50% - 75%"}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={high}
                      onClick={toggleHigh}
                    >
                      <strong className="mr-2 text-green-600">high</strong>
                      {"75% - 100%"}
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    add CAKRAI
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="">
              <KruTable
                author={id}
                setActive={setActive}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
                ids={ids}
                div={division}
              />
            </TabsContent>
            <TabsContent value="mechanic" className="">
              <KruTable
                author={id}
                setActive={setActive}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
                ids={ids}
                div={division}
              />
            </TabsContent>
            <TabsContent value="control" className="">
              <KruTable
                author={id}
                setActive={setActive}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
                ids={ids}
                div={division}
              />
            </TabsContent>
            <TabsContent value="manager" className="">
              <KruTable
                author={id}
                setActive={setActive}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
                ids={ids}
                div={division}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
