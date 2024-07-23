"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import KruSidebar from "@/app/_components/kru/sidebar";
import KruHeader from "@/app/_components/kru/header";
import { useAction } from "next-safe-action/hooks";
import { changePassword, updateProfile } from "~/actions/profile";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

export default function KruProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const update = useAction(updateProfile, {
    onSuccess: (data) => {
      toast.success(data.data?.message);
    },
    onError: (err) => {
      err.error.serverError && toast.error(err.error.serverError);
      err.error.validationErrors &&
        toast.error(
          err.error.validationErrors.name ?? err.error.validationErrors.uname,
        );
    },
  });
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
  const [updateData, setUpdateData] = useState({
    name: "",
    uname: "",
  });
  const [changeData, setChangeData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  async function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await update.executeAsync({
      name: updateData.name,
      uname: updateData.uname,
      id: params.id,
    });
    setUpdateData({ name: "", uname: "" });
  }

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
    <div className="min-h-dvh sm:pt-4">
      <KruHeader />
      <div className="container mx-auto max-w-4xl space-y-4 px-4 sm:pl-14 md:px-6">
        <KruSidebar loc="profile" />
        <div className="mt-2 grid gap-8 rounded-2xl bg-muted/40 px-4 py-6 sm:mt-0">
          <form onSubmit={handleUpdateProfile} className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-pink-700">Profile</h2>
                <p className="text-violet-500">
                  Update your personal information.
                </p>
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 font-semibold"
              >
                Edit Profile
              </Button>
            </div>
            <div className="grid gap-4 rounded-lg border border-pink-400 p-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder='Reini Mangkubumi'
                  name="name"
                  value={updateData.name}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, name: e.target.value });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="uname">Username</Label>
                <Input
                  id="uname"
                  placeholder='reini_mangkubumi'
                  name="uname"
                  type="text"
                  value={updateData.uname}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, uname: e.target.value });
                  }}
                />
              </div>
            </div>
          </form>
          <form onSubmit={handleChangePassword} className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-pink-700">
                  Change Password
                </h2>
                <p className="text-violet-500">Update your account password.</p>
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 font-semibold"
              >
                Change Password
              </Button>
            </div>
            <div className="grid gap-4 rounded-lg border border-pink-400 p-6">
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
    </div>
  );
}
