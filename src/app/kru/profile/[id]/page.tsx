import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import KruSidebar from "@/app/_components/kru/sidebar";
import KruHeader from "@/app/_components/kru/header";

export default function KruProfile() {
  return (
    <div className="min-h-dvh sm:pt-4">
      <KruHeader />
      <div className="container mx-auto max-w-4xl space-y-4 px-4 sm:pl-14 md:px-6">
        <KruSidebar loc="profile" />
        <div className="mt-2 grid gap-8 rounded-2xl bg-muted/40 px-4 py-6 sm:mt-0">
          <div className="grid gap-4">
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
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Bias</Label>
                <Input id="email" type="email" defaultValue="Reini" />
              </div>
            </div>
          </div>
          <div className="grid gap-4">
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
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
