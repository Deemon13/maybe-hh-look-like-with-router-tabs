import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../app/redux/hooks/redux";
import { selectArea } from "../../../app/redux/reducers/vacanciesSlice";

import styles from "./Tabs.module.css";

export const TabsUI = () => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const areaFromState = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );

  const getCityValue = (area: string | null) => {
    switch (area) {
      case "1":
        return "moscow";
      case "2":
        return "petersburg";
      default:
        return null;
    }
  };

  const handleClickOnTabCity = (e: string | null) => {
    if (e === "moscow") {
      dispatch(selectArea("Москва"));
    } else if (e === "petersburg") {
      dispatch(selectArea("Санкт-Петербург"));
    } else {
      dispatch(selectArea(null));
    }

    setSearchParams((searchParams) => {
      searchParams.set("page", String(1));
      return searchParams;
    });

    if (e) navigate(`/vacancies/${e}`, { replace: false });
  };

  return (
    <Tabs
      defaultValue={getCityValue(areaFromState)}
      classNames={{ list: styles.list }}
      onChange={handleClickOnTabCity}
    >
      <Tabs.List>
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
