import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "@/components/shared/forms/sign-up-form";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getUser();

  if (user) redirect("/");
  return (
    <div className="flex items-center justify-center py-16 px-6">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <p className="text-gray-600">Join us and start shopping</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignUpForm />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
