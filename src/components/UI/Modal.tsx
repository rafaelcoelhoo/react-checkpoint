import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
//import { uiActions } from "../../store/ui-slice";
import {Fragment, ReactNode} from "react";
import classes from "./Modal.module.css"
import {uiActions} from "../store/ui-slice";


interface ModalProps {
  children?: ReactNode;
}

function Backdrop() {
  const dispatch = useAppDispatch();
  const cartIsVisible = useAppSelector((state) => state.ui.cartIsVisible);

  const toggleCartHandler = () => {
    console.log("toggleCartHandler")
    dispatch(uiActions.toggleCart());
  };

  const toggleWishlistHandler = () => {
    console.log("toggleWishlistHandler")
    dispatch(uiActions.toggleWishlist());
  };

  return (
    <div
      className={classes.backdrop}
      onClick={cartIsVisible ? toggleCartHandler : toggleWishlistHandler}
    ></div>
  );
}

function ModalOverlay({ children }: ModalProps) {
  return (
    <div className={classes.modal} role={"dialog"} aria-modal={true} tabIndex={-1}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById("overlays")!;

function Modal({ children }: ModalProps) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
}

export default Modal;
