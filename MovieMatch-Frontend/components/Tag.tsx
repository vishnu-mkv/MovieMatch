import classNames from "classnames";
import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  icon?: string;
  text: string | number;
  color?: string;
  iconAlign?: "left" | "right";
  size?: string;
}

const Tag: FC<TagProps> = ({ icon, text, iconAlign, color, size }) => {
  if (!size) size = "is-size-6";
  return (
    <div
      className={classNames(
        "tag",
        `has-icons-${iconAlign || (icon && "left")}`,
        color || "is-success"
      )}
    >
      {icon && (
        <span
          className={classNames(
            "icon material-symbols-outlined",
            `is-icon-${iconAlign || "left"}`,
            size
          )}
        >
          {icon}
        </span>
      )}
      <span className={classNames(size)}>{text}</span>
    </div>
  );
};

interface TagGroupProps extends Omit<TagProps, "icon" | "text"> {
  tags: TagProps[];
  group?: boolean;
}

export const Tags: FC<TagGroupProps> = ({
  tags,
  group,
  color,
  iconAlign,
  size,
}) => {
  if (group) {
    tags.map((tag) => {
      tag.color = tag.color || color;
      tag.iconAlign = tag.iconAlign || iconAlign;
      tag.size = tag.size || size;
    });
  }

  return (
    <div className="columns is-mobile">
      {tags.map((tag, i) => (
        <div
          className="column is-narrow is-narrow-mobile p-1"
          key={`tags--${tag.text}--${i}`}
        >
          <Tag {...tag} />
        </div>
      ))}
    </div>
  );
};

interface LinkTagGroupProps<T> extends Omit<TagGroupProps, "tags" | "group"> {
  data: T[];
  getLink: (item: T) => string;
  getText: (item: T) => string;
}

export function LinkTags<T>({
  data,
  getLink,
  getText,
  color,
  iconAlign,
  size,
}: LinkTagGroupProps<T>) {
  return (
    <div className="columns is-mobile">
      {data.map((item, i) => (
        <div
          className="column is-narrow is-narrow-mobile p-1"
          key={`tags--${getLink(item)}--${i}`}
        >
          <Link href={getLink(item)}>
            <Tag
              color={color}
              iconAlign={iconAlign}
              size={size}
              text={getText(item)}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Tag;
