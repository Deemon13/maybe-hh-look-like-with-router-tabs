import { useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../app/redux/hooks/redux";
import { fetchVacancies } from "../../app/redux/reducers/VacanciesThunk";
import {
  addSkill,
  inputSearchText,
  selectArea,
  setCurrentPage,
} from "../../app/redux/reducers/vacanciesSlice";
import { TabsUI, VacanciesList, LoaderUI, NoResults } from "../../shared";
import { SearchBar, SkillBox, PaginationUI } from "../../widgets";

import styles from "./Vacancies.module.css";

export const Vacancies = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const areaFromParams = (cityParam: string) => {
    switch (cityParam) {
      case "moscow":
        return "1";
      case "petersburg":
        return "2";
      default:
        return null;
    }
  };

  const cityFromParams = (cityParam: string) => {
    switch (cityParam) {
      case "moscow":
        return "Москва";
      case "petersburg":
        return "Санкт-Петербург";
      default:
        return null;
    }
  };

  const status = useTypedSelector((state) => state.vacanciesReducer.status);

  useEffect(() => {
    if (city !== "moscow" && city !== "petersburg") {
      navigate("/not-found", { replace: false });
    }

    const searchSkills = searchParams.get("skills") || "";
    const skillSet = searchSkills?.split(" AND ") || [];
    const pageParam = searchParams.get("page");
    const searchTextKeyword = searchParams.get("keyword") || "";

    if (searchSkills) {
      skillSet.forEach((skill) => dispatch(addSkill(skill)));
    }
    dispatch(setCurrentPage(Number(pageParam)));
    dispatch(inputSearchText(searchTextKeyword));
    if (city) dispatch(selectArea(cityFromParams(city)));

    const searchQuery = searchTextKeyword
      ? `${searchTextKeyword} AND ${searchSkills}`
      : `${searchSkills}`;

    dispatch(
      fetchVacancies({
        page: Number(pageParam),
        text: searchQuery,
        area:
          city === "moscow" || city === "petersburg"
            ? areaFromParams(city)
            : null,
      })
    );
  }, [city, dispatch, navigate, searchParams]);

  return (
    <>
      <SearchBar />
      <div className={styles.vacancies}>
        <div className={styles["search-params"]}>
          <SkillBox />

          {/* <AreaSelect /> */}
        </div>

        {status ? (
          <LoaderUI />
        ) : vacancies.length === 0 ? (
          <NoResults />
        ) : (
          <div className={styles["vacancies-field"]}>
            <TabsUI />

            <VacanciesList items={vacancies} />

            <PaginationUI />
          </div>
        )}
      </div>
    </>
  );
};
