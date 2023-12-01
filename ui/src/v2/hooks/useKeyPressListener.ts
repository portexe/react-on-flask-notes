import { useCallback, useEffect } from "react";

interface Props {
  key: string;
  listener: () => void;
  meta?: boolean;
}

export function useKeyPressListener({ key, listener, meta = false }: Props) {
  function commandPaletteListener(evt: KeyboardEvent) {
    const metaKeyFulfilled = meta ? evt.metaKey : true;

    if (evt.key === key && metaKeyFulfilled) {
      listener();
    }
  }

  const callback = useCallback(commandPaletteListener, [
    commandPaletteListener,
  ]);

  useEffect(() => {
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [callback]);
}
