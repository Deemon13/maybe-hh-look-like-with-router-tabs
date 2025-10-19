import { Tabs } from "@mantine/core";

import styles from "./Tabs.module.css";

export const TabsUI = () => {
  const handleClickOnTabCity = (e: string | null) => {
    console.log(e);
  };

  return (
    <Tabs
      defaultValue="moscow"
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
