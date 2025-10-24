import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";

import { useTypedDispatch } from "../../../app/redux/hooks/redux";
import { selectArea } from "../../../app/redux/reducers/vacanciesSlice";

import styles from "./Tabs.module.css";

export const TabsUI = () => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { city } = useParams();

  const dispatch = useTypedDispatch();

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
      defaultValue={city}
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
