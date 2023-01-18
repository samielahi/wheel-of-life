import { MouseEvent } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  onClick?: (event: MouseEvent) => void;
  children?: any;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
}
