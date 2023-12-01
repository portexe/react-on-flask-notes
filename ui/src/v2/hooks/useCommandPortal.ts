import { useEffect, useState } from "react";

export function useCommandPortal(open: boolean) {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    if (open) {
      const div = document.createElement("div");
      div.id = "command-palette";
      document.body.prepend(div);

      setPortalReady(true);

      return () => {
        setPortalReady(false);
        document.body.removeChild(div);
      };
    }
  }, [open]);

  return portalReady;
}
