"use client";

import { ListFilter, PlusCircle } from "lucide-react";
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
import { useState } from "react";
import KruTable from "@/app/_components/kru/table";
import { useToggle } from "@/hooks/useToggle";
import KruHeader from "@/app/_components/kru/header";
import type { Attendance, User } from "@prisma/client";

export default function Kru({
  params,
  cakrais,
  maxAttend
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
    if (division === "all" && lowerBound === 0 && upperBound === 100) return true;
    return (cakrai.division.toLowerCase() === division || division === "all") && (cakrai.attendance >= lowerBound && cakrai.attendance <= upperBound);
  });
  const lastpage = Math.ceil(filteredData.length / 6);

  return (
    <div className="relative flex min-h-dvh w-full flex-col">
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
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
              />
            </TabsContent>
            <TabsContent value="mechanic" className="">
              <KruTable
                author={id}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
              />
            </TabsContent>
            <TabsContent value="control" className="">
              <KruTable
                author={id}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
              />
            </TabsContent>
            <TabsContent value="manager" className="">
              <KruTable
                author={id}
                data={filteredData}
                page={page}
                setPage={setPage}
                lastpage={lastpage}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
