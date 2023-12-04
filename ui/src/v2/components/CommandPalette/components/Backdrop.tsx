/*
  Functions as the backdrop for a Modal. The purpose of
  the backdrop is to cover the screen and to provide an
  area that can listen to clicks in order to close the Modal
  since in a typical UI, you would expect the Modal to close
  if you click outside of it
*/

export function Backdrop({ closeEvent }: { closeEvent: () => void }) {
  return (
    <div
      onClick={closeEvent}
      className="absolute top-0 left-0 z-0 w-full h-full bg-opacity-20 bg-zinc-50 backdrop-blur-sm"
    ></div>
  );
}
