"use client";

import { FormContainer, FormProps } from "@/components/Form";
import { LoginData } from "@/constants";
import { post } from "@/utils/api_helpers";
import { CustomMatcher } from "@radix-ui/react-form";
import { useRouter } from "next/navigation";

const RegisterData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const passwordMatcher: CustomMatcher = (value: string, formdata) => {
  return value != formdata.get("password");
};

function Signup() {
  const router = useRouter();

  const formProps: FormProps<typeof RegisterData> = {
    button: {
      text: "Register",
      className: "is-fullwidth",
    },
    fields: [
      {
        label: "First Name",
        name: "firstName",
        type: "text",
        messages: [
          {
            message: "Please enter a first name",
            match: "valueMissing",
          },
        ],
      },
      {
        label: "Last Name",
        name: "lastName",
        type: "text",
        messages: [
          {
            match: "valueMissing",
            message: "Please enter a last name",
          },
        ],
      },
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
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        messages: [
          {
            match: "valueMissing",
            message: "Please confirm your password",
          },
          {
            match: passwordMatcher,
            message: "Passwords do not match",
          },
        ],
      },
    ],
    title: "Register with Movie Matcher.",
    initial: RegisterData,
    onSubmit: async (data) => {
      await post<LoginData>("/auth/register", data);
      router.push("/auth/login");
    },
  };

  return (
    <div>
      <FormContainer {...formProps}></FormContainer>
    </div>
  );
}

export default Signup;
