import { Navigate, Routes, Route } from "react-router-dom";

import { Vacancies, VacancyPage, NotFound } from "../../pages";
import { Layout } from "../../shared";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="vacancies" replace />} />
          <Route path="vacancies/:city" element={<Vacancies />} />
          <Route path="vacancies/:city/:id" element={<VacancyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
