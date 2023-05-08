"use client";
import * as _Toast from "@radix-ui/react-toast";
import Button, { ButtonProps } from "./Button";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

export interface ToastProps {
  actionButton?: ButtonProps;
  title: string;
  description?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  color?: string;
}

function Toast(props: ToastProps) {
  return (
    <_Toast.Root
      className={classNames("message", props.color || "is-info")}
      open={props.open}
      onOpenChange={props.setOpen}
    >
      <_Toast.Title className="message-header ">{props.title}</_Toast.Title>
      {props.description && (
        <_Toast.Description asChild className="">
          {props.description}
        </_Toast.Description>
      )}
      <_Toast.Action className="message-body" asChild altText="action">
        {props.actionButton && <Button {...props.actionButton}></Button>}
      </_Toast.Action>
    </_Toast.Root>
  );
}

export default Toast;
