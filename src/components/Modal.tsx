import type { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <button id="myBtn">Open Modal</button> */}

      <div id="myModal" className="modal">
        {/* <!-- Modal content --> */}

        <div className="modal-content"> {children}</div>
      </div>
    </>
  );
}

export default Modal;
