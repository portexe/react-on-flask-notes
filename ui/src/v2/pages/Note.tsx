import { useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { CommandPalette } from "../components";

export function Note() {
  const [markdown, setMarkdown] = useState("");

  return (
    <main className="flex flex-col w-full">
      <CommandPalette />

      <nav className="flex justify-end gap-4 p-2 pt-4 pb-4 border-b-2 border-black">
        <button>Save</button>
        <button>Delete</button>
      </nav>

      <div className="flex flex-1 w-full">
        <div className="flex-1 border-r-2 border-black ">
          <textarea
            autoFocus
            placeholder="Begin typing here"
            className="box-border w-full h-full p-4 outline-none resize-none"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex-1 p-4 prose">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      </div>
    </main>
  );
}
