import React from "react";
import SininWithButton from "~/components/custom/buttons/signin-with-button";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthProviders } from "~/server/auth";

export default function Page() {
  console.log(AuthProviders);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent className="">
          <div className="flex w-full flex-col space-y-4">
            {AuthProviders &&
              AuthProviders.map((provider) => (
                <SininWithButton providerId={provider.id} key={provider.name}>
                  Sign in with {provider.name}
                </SininWithButton>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
