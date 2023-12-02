import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  clickable?: boolean;
  margin?: "small" | "medium" | "large";
  focused?: boolean;
  onClick?: () => void;
};

export function ModalSection({
  children,
  margin = "medium",
  clickable = true,
  focused = false,
  onClick = () => {},
}: Props) {
  return (
    <div
      onClick={() => {
        if (clickable) {
          onClick();
        }
      }}
      className={`border-b-2 border-gray-200 p-4 ${
        clickable &&
        `hover:bg-gray-100 cursor-pointer ${focused && "bg-gray-100"}`
      } ${
        margin === "small" ? "pb-4" : margin === "medium" ? "pb-6" : "pb-8"
      } ${margin === "small" ? "pt-4" : margin === "medium" ? "pt-6" : "pt-8"}`}
    >
      {children}
    </div>
  );
}
