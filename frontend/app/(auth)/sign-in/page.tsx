import SignInForm from "@/components/shared/forms/sign-in-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/actions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <div className="flex items-center justify-center py-16 px-6">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignInForm />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
