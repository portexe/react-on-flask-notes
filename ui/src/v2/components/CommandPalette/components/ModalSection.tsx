import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  clickable?: boolean;
  margin?: "small" | "medium" | "large";
};

export function ModalSection({
  children,
  margin = "medium",
  clickable = true,
}: Props) {
  return (
    <div
      className={`border-b-2 border-gray-200 p-4 ${
        clickable && "hover:bg-gray-100 cursor-pointer"
      } ${
        margin === "small" ? "pb-4" : margin === "medium" ? "pb-6" : "pb-8"
      } ${margin === "small" ? "pt-4" : margin === "medium" ? "pt-6" : "pt-8"}`}
    >
      {children}
    </div>
  );
}
