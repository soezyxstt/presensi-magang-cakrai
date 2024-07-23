"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { changePassword } from "~/actions/profile";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import type { Attendance, User } from "@prisma/client";
import { TextGenerateEffect } from "~/components/aceternity/text-generate-effect";
import { LogOut, PartyPopper, Plane, Stamp, Star } from "lucide-react";
import { FlipWords } from "~/components/aceternity/flip-words";
import Link from 'next/link';

export default function Cakru({
  params,
  user,
  maxAttendance,
}: {
  params: { id: string };
  user: (User & { attendance: Attendance[] }) | null;
  maxAttendance: number;
}) {
  const present =
    user?.attendance.filter((a) => a.status === "PRESENT").length ?? 0;
  const late = user?.attendance.filter((a) => a.status === "LATE").length ?? 0;
  const absent =
    user?.attendance.filter((a) => a.status === "ABSENT").length ?? 0;
  const total = maxAttendance;

  const router = useRouter();
  const change = useAction(changePassword, {
    onSuccess: (data) => {
      toast.success(data.data?.message);
      setTimeout(() => {
        router.push("/sign-out");
      }, 1000);
    },
    onError: (err) => {
      err.error.serverError && toast.error(err.error.serverError);
      err.error.validationErrors &&
        toast.error(
          err.error.validationErrors.oldPassword ??
            err.error.validationErrors.password ??
            err.error.validationErrors.confirmPassword,
        );
    },
  });

  const [changeData, setChangeData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await change.executeAsync({
      id: params.id,
      oldPassword: changeData.oldPassword,
      password: changeData.password,
      confirmPassword: changeData.confirmPassword,
    });
    setChangeData({ oldPassword: "", password: "", confirmPassword: "" });
  }
  return (
    <div className="relative min-h-dvh w-full flex flex-col gap-6 px-6 md:py-6 py-4 md:px-12">
      <Link href="/sign-out" className='absolute top-6 right-6'>
        <LogOut className="w-4 h-4 md:w-6 md:h-6 text-violet-100" />
      </Link>
      <div className="">
        <TextGenerateEffect words="Dashboard" className="md:text-3xl" />
        <div className="flex w-full justify-end font-semibold text-violet-100 md:text-2xl">
          Be the
          <FlipWords
            words={["best", "future", "prime", "supreme"]}
            duration={2000}
            className='text-violet-700'
          />
          of KRAI.
        </div>
      </div>
      <div className="grid grid-flow-row gap-x-4 gap-y-4 md:grid-flow-col">
        <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 p-6 text-violet-600 backdrop-blur-sm">
          <div className="flex justify-between">
            <h2 className="font-semibold">Name</h2>
            <Star />
          </div>
          <h1 className="text-lg font-bold text-violet-800">{user?.name}</h1>
        </div>
        <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 p-6 text-violet-600 backdrop-blur-sm">
          <div className="flex justify-between">
            <h2 className="font-semibold">Division</h2>
            <PartyPopper />
          </div>
          <h1 className="text-lg font-bold capitalize text-violet-800">
            {user?.division.toLowerCase()}
          </h1>
        </div>
        <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 p-6 text-violet-600 backdrop-blur-sm">
          <div className="flex justify-between">
            <h2 className="font-semibold">Username</h2>
            <Plane />
          </div>
          <h1 className="text-lg font-bold text-violet-800">{user?.uname}</h1>
        </div>
        <div className="space-y-1 rounded-2xl border border-violet-200 bg-white/20 p-6 text-violet-600 backdrop-blur-sm">
          <div className="flex justify-between">
            <h2 className="font-semibold">Status</h2>
            <Stamp />
          </div>
          <h1 className="text-lg font-bold text-violet-800">Cakrai</h1>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 md:h-full md:flex-row">
        <Card
          className="h-fit max-w-md rounded-2xl bg-white/20 md:w-2/5"
          x-chunk="charts-01-chunk-4"
        >
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
                    label: `${present / total * 100}%`,
                    fill: "var(--color-present)",
                  },
                  {
                    activity: "late",
                    value: (late / total) * 100,
                    label: `${late / total * 100}%`,
                    fill: "var(--color-late)",
                  },
                  {
                    activity: "absent",
                    value: (absent / total) * 100,
                    label: `${absent / total * 100}%`,
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
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-gray-800">Late</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-pink-700">
                  {late}
                  <span className="text-sm font-normal text-gray-800">
                    days
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
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
        <form
          onSubmit={handleChangePassword}
          className="grid w-full gap-4 rounded-2xl border border-white bg-white/20 p-4 backdrop-blur-sm md:h-full"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-pink-700 md:text-2xl">
                Change Password
              </h2>
              <p className="text-sm text-violet-500 md:text-base">
                Update your account password.
              </p>
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              disabled={change.isExecuting}
            >
              Change Password
            </Button>
          </div>
          <div className="grid gap-4 rounded-2xl border border-pink-200 p-6">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={changeData.oldPassword}
                onChange={(e) => {
                  setChangeData({
                    ...changeData,
                    oldPassword: e.target.value,
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={changeData.password}
                onChange={(e) => {
                  setChangeData({ ...changeData, password: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={changeData.confirmPassword}
                onChange={(e) => {
                  setChangeData({
                    ...changeData,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
