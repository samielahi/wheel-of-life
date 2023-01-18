import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
  return (
    <>
      <div className={`wrapper | flex | bottomBordered | ${styles.toolbar}`}>
        <div className={`flex | w-third | ${styles.upload}`}>
          <Button>upload file</Button>
          <Button>upload folder</Button>
        </div>

        {/* TODO : implement input "text" component */}
        <div className={styles.name}>Name of Animation</div>

        <div className={`flex | w-third | ${styles.export}`}>
          <Button>export</Button>
          <Button>help</Button>
        </div>
      </div>
    </>
  );
}
