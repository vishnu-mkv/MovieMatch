"use client";

import * as Form from "@radix-ui/react-form";
import { FormEvent, FunctionComponent } from "react";
import Button, { ButtonProps } from "./Button";
import { useState } from "react";
import Message from "./Message";
import Toast, { ToastProps } from "./Toast";
import classNames from "classnames";
import Select from "react-select";

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export interface FormMessageProps extends Form.FormMessageProps {
  message: string;
}

export const FormMessage: FunctionComponent<FormMessageProps> = ({
  match,
  forceMatch,
  message,
  name,
}) => {
  return (
    <Form.Message
      className="has-text-danger has-size-7"
      match={match}
      name={name}
      forceMatch={forceMatch}
    >
      <small>{message}</small>
    </Form.Message>
  );
};

export interface FieldProps<T, U = any> {
  name: string;
  defaultValue?: string;
  label: string;
  value?: T;
  type: string;
  onChange?: (value: any) => T;
  messages?: FormMessageProps[];
  required?: boolean;
  inputProps?: {
    min?: number;
    max?: number;
    accept?: "image/*";
  };
  input?: "textarea" | "input" | "select";
  select?: {
    multiple?: boolean;
    data: U[];
    getName: (val: U) => string;
    getValue: (val: U) => string;
  };
}

function checkForMessage(
  messages: FormMessageProps[] | undefined,
  match: string
): boolean {
  return messages !== undefined && messages.some((m) => m.match === match);
}

export function FormField<T, U>(props: FieldProps<T, U>) {
  const inputType = props.input == undefined ? "input" : props.input;

  const messages: FormMessageProps[] = [];

  if (
    (props.required || props.required === undefined) &&
    !checkForMessage(props.messages, "valueMissing")
  ) {
    messages?.push({
      match: "valueMissing",
      message: `${props.label} is required`,
    });
  }

  if (
    props.inputProps?.max &&
    !checkForMessage(props.messages, "rangeOverflow")
  ) {
    messages?.push({
      match: "rangeOverflow",
      message: `${props.label} should be lower than ${props.inputProps.max}`,
    });
  }

  if (
    props.inputProps?.min &&
    !checkForMessage(props.messages, "rangeUnderflow")
  ) {
    messages?.push({
      match: "rangeOverflow",
      message: `${props.label} should be greater than ${props.inputProps.min}`,
    });
  }

  if (props.messages) {
    messages.push(...props.messages);
  }

  const inputProps = {
    className: inputType === "select" ? "w-100" : inputType,
    type: props.type,
    required: props.required !== undefined ? props.required : true,
    defaultValue: props.type == "file" ? undefined : props.defaultValue,
    onChange: (e: any) => {
      props.onChange && props.onChange(e);
    },
    value:
      inputType === "select" || props.type == "file"
        ? undefined
        : props.type === "date"
        ? new Date(props.value as any).toISOString().split("T")[0]
        : (props.value as any),
    ...props.inputProps,
  };

  return (
    <Form.Field className="field my-5" name={props.name}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label className="label mb-2">{props.label}</Form.Label>
        {messages.map((message) => (
          <FormMessage
            {...message}
            name={props.name}
            key={`$message--${props.name}--${message.match}`}
          />
        ))}
      </div>
      {props.type == "file" && (props.value || props.defaultValue) && (
        <figure className="image">
          <img
            src={
              (props.value
                ? URL.createObjectURL(props.value as any)
                : props.defaultValue || "") as any
            }
            alt=""
          />
        </figure>
      )}
      {inputType === "textarea" && (
        <Form.Control asChild>
          <textarea {...inputProps}></textarea>
        </Form.Control>
      )}
      {inputType === "input" && (
        <Form.Control asChild>
          <input {...inputProps} />
        </Form.Control>
      )}
      {inputType === "select" && (
        <div className={classNames("select w-100")}>
          <Select
            name={props.name}
            options={
              props.select?.data.map((d) => {
                return {
                  value: props.select?.getValue(d),
                  label: props.select?.getName(d),
                };
              }) as any
            }
            required={props.required}
            isMulti={props.select?.multiple || false}
            onChange={props.onChange}
            value={props.value}
          ></Select>
        </div>
      )}
    </Form.Field>
  );
}

interface FormToastProps extends Omit<ToastProps, "open" | "setOpen"> {}

export interface FormProps<T, U = any> {
  button: ButtonProps;
  fields: FieldProps<any, U>[];
  title?: string;
  onSubmit?: (data: T, e: FormEvent) => void | Promise<any>;
  initial?: T;
  getErrorMessage?: (data: any) => string;
  toast?: FormToastProps;
  maxWidth?: string;
}

interface Data {
  [key: string]: unknown;
}

export function FormContainer<T>({
  button,
  fields,
  title,
  onSubmit,
  initial,
  getErrorMessage,
  toast,
  maxWidth,
}: FormProps<T>) {
  // console.log(fields);
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  function getDataProp(name: string) {
    if (!data || !data.hasOwnProperty(name)) return undefined;
    var newData: Data = structuredClone(data);
    return newData[name];
  }

  function handleChange(name: string, value: string) {
    setError("");
    if (!data || !data.hasOwnProperty(name)) return;
    var newData: Data = structuredClone(data);

    newData[name] = value;
    setData(newData as T);
  }

  async function handleSubmit(e: FormEvent) {
    if (!data || !onSubmit) return;

    setLoading(true);

    try {
      await onSubmit(data, e);
      setShowToast(true);
    } catch (err: any) {
      let message =
        (getErrorMessage && getErrorMessage(err)) ||
        (typeof err?.message === "string" && err?.message) ||
        (typeof err === "string" && err) ||
        JSON.stringify(err);
      ("Something went wrong");
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="box container is-max-desktop my-6"
      style={{
        maxWidth: maxWidth || "500px",
      }}
    >
      {title && (
        <h1 className="is-size-4 mb-5 has-text-centered has-text-primary has-text-weight-bold">
          {title}
        </h1>
      )}
      {toast && (
        <Toast {...toast} open={showToast} setOpen={setShowToast}></Toast>
      )}
      <Message type="is-danger" message={error}></Message>
      <Form.Root
        method="post"
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {fields.map((field) => (
          <FormField
            key={`field--${field.name}`}
            {...field}
            onChange={(e) =>
              handleChange(
                field.name,
                field.onChange ? field.onChange(e) : e.target.value
              )
            }
            value={getDataProp(field.name)}
          />
        ))}
        <Form.Submit asChild>
          <div className="buttons is-centered mt-5">
            <Button {...button} loading={loading}></Button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
