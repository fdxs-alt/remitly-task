import { RefObject, useEffect } from "react";
function useClickOutside(ref: RefObject<HTMLElement>, cb: CallableFunction) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e?.target)) {
        return;
      }
      cb();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, cb]);
}

export default useClickOutside;
