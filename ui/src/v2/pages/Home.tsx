import { useKeyPressListener } from "../hooks";
import { PropsWithChildren, useState } from "react";
import { CommandPalette, DefaultView } from "../components";

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

      <View>
        <DefaultView />
      </View>
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
