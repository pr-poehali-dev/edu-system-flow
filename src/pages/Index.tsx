import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import CalendarPage from "./CalendarPage";
import Learning from "./Learning";
import Tests from "./Tests";
import Progress from "./Progress";
import Reports from "./Reports";
import Management from "./Management";

export default function Index() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "tasks": return <Tasks />;
      case "calendar": return <CalendarPage />;
      case "learning": return <Learning />;
      case "tests": return <Tests />;
      case "progress": return <Progress />;
      case "reports": return <Reports />;
      case "management": return <Management />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
