import { PropsWithChildren } from "react";

export function Modal({ children }: PropsWithChildren) {
  return (
    <div className="z-10 flex flex-col max-w-full overflow-auto bg-white border-2 rounded-lg max-h-comfortable w-160 400 drop-shadow-md border-zinc-300">
      {children}
    </div>
  );
}
