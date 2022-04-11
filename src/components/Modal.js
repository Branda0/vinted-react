import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const getScrollBarWidth = () => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("modal-no-scroll");
    document.body.style.marginRight = `${getScrollBarWidth()}px`;

    return () => {
      document.body.classList.remove("modal-no-scroll");
      document.body.style.marginRight = "0px";
    };
  }, []);

  return createPortal(<div className="modal">{children}</div>, document.getElementById("modal_root"));
};

export default Modal;
