import { PropsWithChildren, useState } from "react";

import { useKeyPressListener } from "../hooks";
import { CommandPalette } from "../components";

export function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useKeyPressListener({
    key: "k",
    meta: true,
    listener: () => {
      setCommandPaletteOpen(true);
    },
  });

  return (
    <Page>
      <CommandPalette
        open={commandPaletteOpen}
        closeEvent={() => setCommandPaletteOpen(false)}
      />

      <View>Press ⌘ + K to get started</View>
    </Page>
  );
}

function View({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {children}
    </div>
  );
}

function Page({ children }: PropsWithChildren) {
  return <main className="flex flex-col items-center p-6">{children}</main>;
}
