import React from "react";
import Button, { ButtonProps, LinkButtonProps } from "./Button";

export interface TitleProps {
  title: string;
  button?: ButtonProps | LinkButtonProps;
}

function Title({ title, button }: TitleProps) {
  return (
    <div
      className="mt-6 mb-4 mx-1 p-3 has-text-centered has-background-black 
    has-text-warning has-text-weight-bold is-flex is-align-items-center is-justify-content-space-between"
    >
      <h1 className="is-title is-size-5">{title}</h1>
      {button && <Button {...button} />}
    </div>
  );
}

export default Title;
