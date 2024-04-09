import React from "react";
import SininWithButton from "~/components/custom/buttons/signin-with-button";
import SignoutButton from "~/components/custom/buttons/signout-button";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Not Authorized</CardTitle>
          <CardDescription>
            You are not authorized to view this page with your current role.
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <div className="flex w-full flex-col space-y-4">
            <SignoutButton>Sign out</SignoutButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
