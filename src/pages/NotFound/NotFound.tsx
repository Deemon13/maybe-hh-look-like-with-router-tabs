import { Link } from "react-router-dom";

import { useTypedDispatch } from "../../app/redux/hooks/redux";
import { selectArea } from "../../app/redux/reducers/vacanciesSlice";
import NotFoundImg from "../../app/assets/not-found-page/not-found.png";

import styles from "./NotFound.module.css";

export const NotFound = () => {
  const dispatch = useTypedDispatch();

  return (
    <div className={styles["not-found__container"]}>
      <div className={styles["not-found__data"]}>
        <div>
          <h1 className={styles["not-found__title"]}>
            Упс! Такой страницы не существует
          </h1>
          <p className={styles["not-found__to-begin"]}>
            Давайте перейдём к началу.
          </p>
        </div>

        <Link
          className={styles["not-found__button"]}
          to={"/vacancies/moscow"}
          onClick={() => dispatch(selectArea("Москва"))}
        >
          На главную
        </Link>
      </div>

      <img
        className={styles["not-found__img"]}
        src={NotFoundImg}
        alt="not-found-image"
        width="640"
        height="336"
      />
    </div>
  );
};
