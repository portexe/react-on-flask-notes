import { PropsWithChildren } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { CommandPalette } from "../components";

import { CommandCategory } from "../../types";

export function Home() {
  const goTo = useNavigate();

  return (
    <Page>
      <CommandPalette
        commandItems={[
          {
            key: "createNote",
            text: {
              content: "Create Note",
            },
            icon: CiCirclePlus,
            action: () => goTo("/note"),
            category: CommandCategory.AppLevelCommand,
          },
        ]}
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
