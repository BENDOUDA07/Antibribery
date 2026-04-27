import { createBrowserRouter } from "react-router";
import { LoginScreen } from "./pages/LoginScreen";
import { CitizenLayout } from "./layouts/CitizenLayout";
import { AuthorityLayout } from "./layouts/AuthorityLayout";
import { SubmitReclamation } from "./pages/SubmitReclamation";
import { MyReclamations } from "./pages/MyReclamations";
import { AuthorityDashboard } from "./pages/AuthorityDashboard";
import { Cases } from "./pages/Cases";
import { MapView } from "./pages/MapView";
import { Reports } from "./pages/Reports";
import { AuditLogs } from "./pages/AuditLogs";
import { SettingsPage } from "./pages/SettingsPage";
import { GenerateReport } from "./pages/GenerateReport";
import { RegionalReports } from "./pages/RegionalReports";
import { ReportResults } from "./pages/ReportResults";
import { ScheduleReport } from "./pages/ScheduleReport";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/citizen",
    Component: CitizenLayout,
    children: [
      {
        index: true,
        Component: MyReclamations,
      },
      {
        path: "submit",
        Component: SubmitReclamation,
      },
      {
        path: "generate-report",
        element: <GenerateReport userType="citizen" />,
      },
    ],
  },
  {
    path: "/authority",
    Component: AuthorityLayout,
    children: [
      {
        index: true,
        Component: AuthorityDashboard,
      },
      {
        path: "cases",
        Component: Cases,
      },
      {
        path: "map",
        Component: MapView,
      },
      {
        path: "reports",
        Component: Reports,
      },
      {
        path: "generate-report",
        element: <GenerateReport userType="authority" />,
      },
      {
        path: "regional-reports",
        Component: RegionalReports,
      },
      {
        path: "report-results",
        Component: ReportResults,
      },
      {
        path: "schedule-report",
        Component: ScheduleReport,
      },
      {
        path: "audit",
        Component: AuditLogs,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);