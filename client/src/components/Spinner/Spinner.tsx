import classes from "./Spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <article className={classes.article}>
      <div className={classes.spinner}></div>
    </article>
  );
};

export default Spinner;
