import React from "react";
import ReactDOM from "react-dom";
import classes from "./Portal.module.css";
const root = document.getElementById("portal") as HTMLElement;

type Props = {
  children: React.ReactNode;
};

const PortalWrapper: React.FC<Props> = ({ children }) => {
  return <article className={classes.article}>{children}</article>;
};

const Portal: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<PortalWrapper>{children}</PortalWrapper>, root)}
    </React.Fragment>
  );
};

export default Portal;
