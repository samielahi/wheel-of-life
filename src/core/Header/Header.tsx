import Button from "../Button/Button";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={`wrapper | flex | bottomBordered | ${styles.header}`}>
        <div className={`w-third | ${styles.back}`}>
          <Button>back to all</Button>
        </div>

        <div className={`flex | ${styles.logo}`}>
          <h2>Wheel Of Life</h2>
          <span>strip editor</span>
        </div>

        <div className={`flex | w-third | ${styles.build}`}>
          <Button>build strip</Button>
          <Button>spin</Button>
        </div>
      </header>
    </>
  );
}
