import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

// scrollBarStyle.marginRight = `${getScrollBarWidth()}px`;

const Modal = ({ children, open }) => {
  var scrollBarStyle = document.createElement("style");
  scrollBarStyle.type = "text/css";
  scrollBarStyle.innerHTML = `.cssClass { margin-right: ${getScrollBarWidth}px; }`;
  document.getElementsByTagName("head")[0].appendChild(scrollBarStyle);
  //   if (open) {
  //   document.body.classList.add(scrollBarStyle); // removing scrollBar width from body width to disable content right/left shift when opening modal
  document.body.classList.add("cssClass");
  document.body.classList.add("modal-no-scroll");

  return createPortal(
    <div className="modal">
      <div className="content">{children}</div>
    </div>,
    document.getElementById("modal_root")
  );
  //   } else {
  //     document.body.style.marginRight = `0px`;
  //     return null;
  //   }
};

export default Modal;
