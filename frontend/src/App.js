import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import DensityPage from "./pages/DensityPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/users"
          element={<UsersPage />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="/recommendations"
          element={<RecommendationsPage />}
        />

        <Route
          path="/density"
          element={<DensityPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;