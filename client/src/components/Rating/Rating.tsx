import classes from "./Rating.module.css";

interface Props {
  setTransRate: React.Dispatch<React.SetStateAction<number>>;
  transRate: number;
}

const rateList = [
  { value: 1, selected: false },
  { value: 2, selected: false },
  { value: 3, selected: false },
  { value: 4, selected: false },
  { value: 5, selected: true },
];

const Rating: React.FC<Props> = ({ setTransRate, transRate }) => {
  if (transRate === 5) {
    rateList.forEach((obj) => (obj.selected = false));
    rateList[4].selected = true;
  }
  return (
    <div>
      {rateList.map((obj, index) => {
        return (
          <button
            key={`BUTTON_${index}`}
            className={obj.selected ? classes.rateSelection : classes.rate}
            onClick={() => {
              rateList.forEach((obj) => (obj.selected = false));
              obj.selected = !obj.selected;
              setTransRate(obj.value);
            }}
          >
            {obj.value}
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
