"use client";

import { FormContainer, FormProps } from "@/components/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginData = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();

  const formProps: FormProps<typeof LoginData> = {
    button: {
      text: "Login",
      className: "is-fullwidth",
    },
    fields: [
      {
        label: "Email",
        name: "email",
        type: "email",
        messages: [
          {
            message: "Please provide a valid email",
            match: "typeMismatch",
          },
          {
            match: "valueMissing",
            message: "Please enter your email",
          },
        ],
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        messages: [
          {
            match: "valueMissing",
            message: "Please enter your password",
          },
        ],
      },
    ],
    title: "Login to Movie Matcher.",
    initial: LoginData,
    onSubmit: async (data) => {
      const result: any = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!result.ok) {
        throw result.error;
      }
      router.push("/", { forceOptimisticNavigation: true });
    },
    toast: {
      title: "Login success",
    },
  };

  return (
    <div>
      <FormContainer {...formProps}></FormContainer>
    </div>
  );
}

export default Login;
