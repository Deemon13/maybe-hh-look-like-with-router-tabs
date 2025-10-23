import { Link } from "react-router-dom";

import { useTypedDispatch } from "../../../app/redux/hooks/redux";
import { selectArea } from "../../../app/redux/reducers/vacanciesSlice";

import styles from "./NavHeader.module.css";

export const NavHeader = () => {
  const dispatch = useTypedDispatch();

  return (
    <nav className={styles["nav-menu"]}>
      <ul className={styles["nav-menu__list"]}>
        <li className={styles["nav-menu__item"]}>
          <Link
            to="/vacancies/moscow"
            className={`${styles["nav-menu__link"]} ${styles["nav-menu__link--active"]}`}
            onClick={() => dispatch(selectArea("Москва"))}
          >
            Вакансии FE
          </Link>
        </li>
        <li className={styles["nav-menu__item"]}>
          <a
            href="#"
            className={`${styles["nav-menu__link"]} ${styles["nav-menu__link--about-me"]}`}
          >
            Обо мне
          </a>
        </li>
      </ul>
    </nav>
  );
};
