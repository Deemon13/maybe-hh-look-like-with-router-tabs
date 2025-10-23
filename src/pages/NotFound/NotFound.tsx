import { Link } from "react-router-dom";

import { useTypedDispatch } from "../../app/redux/hooks/redux";
import { selectArea } from "../../app/redux/reducers/vacanciesSlice";

import styles from "./NotFound.module.css";

export const NotFound = () => {
  const dispatch = useTypedDispatch();

  return (
    <div className={styles["not-found__container"]}>
      Bad GateWay
      <Link
        to={"/vacancies/moscow"}
        onClick={() => dispatch(selectArea("Москва"))}
      >
        На главную
      </Link>
    </div>
  );
};
