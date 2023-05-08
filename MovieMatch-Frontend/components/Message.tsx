import React from "react";
import classNames from "classnames";

interface MessageProps {
  type?: string;
  message?: string;
  title?: string;
}

function Message(props: MessageProps) {
  if (!props.message) return <></>;
  return (
    <div className={classNames("message", props.type || "is-success")}>
      {props.title && <div className="message-header">{props.title}</div>}
      <div className="message-body">{props.message}</div>
    </div>
  );
}

export default Message;
