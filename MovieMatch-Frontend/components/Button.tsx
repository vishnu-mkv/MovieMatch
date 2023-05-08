"use client";

import classNames from "classnames";
import Link from "next/link";
import { MouseEvent, ReactNode } from "react";

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  color?: string;
  disabled?: boolean;
  children?: ReactNode;
  text?: string;
  className?: string;
}

function getButtonProps(props: ButtonProps) {
  return {
    className: classNames([
      "button",
      { "is-loading": props.loading },
      props.color || "is-primary",
      props.className,
    ]),
    disabled: props.disabled,
  };
}

function _Button(props: ButtonProps) {
  return (
    <button
      {...getButtonProps(props)}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {props.children || props.text}
    </button>
  );
}

export interface LinkButtonProps
  extends Omit<ButtonProps, "onClick" | "loading"> {
  href: string;
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <Link href={props.href} {...getButtonProps(props)}>
      {props.children || props.text}
    </Link>
  );
}

function isLinkButtonProps(
  item: LinkButtonProps | ButtonProps
): item is LinkButtonProps {
  return "href" in item;
}

function Button(props: LinkButtonProps | ButtonProps) {
  if (isLinkButtonProps(props)) {
    return <LinkButton {...props} />;
  }
  return <_Button {...props} />;
}

export default Button;
