import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth and Helpers
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Login from "../pages/Login";
import SignupOfficer from "../pages/SignupOfficer";
import SignupSailor from "../pages/SignupSailor";
import NotFound from "../pages/NotFound";

// Universal Landing Dashboard
import Dashboard from "../pages/Dashboard";

// Dashboards (A1–A7)
import AdminDashboard from "../pages/AdminDashboard";
import CODashboard from "../pages/CODashboard";
import XODashboard from "../pages/XODashboard";
import RODashboard from "../pages/RODashboard";
import GODashboard from "../pages/GODashboard";
import DODashboard from "../pages/DODashboard";
import SailorDashboard from "../pages/SailorDashboard";

// Department Head Dashboards (A6)
import EODashboard from "../pages/EODashboard";
import LODashboard from "../pages/LODashboard";
import SODashboard from "../pages/SODashboard";
import MODashboard from "../pages/MODashboard";
import XODepartmentDashboard from "../pages/XODepartmentDashboard";

// Drill‑down Views
import ViewSailorProfile from "../pages/ViewSailorProfile";
import DivisionView from "../pages/DivisionView";
import DepartmentHeadDashboard from "../components/DepartmentHeadDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup/officer" element={<SignupOfficer />} />
        <Route path="/signup/sailor" element={<SignupSailor />} />

        {/* UNIVERSAL LANDING */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* =============================
              ROLE‑BASED DASHBOARDS
           ============================= */}

        {/* Admin */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["admin"]}>
                <MainLayout>
                  <AdminDashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* CO */}
        <Route
          path="/dashboard/co"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["co"]}>
                <MainLayout>
                  <CODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* XO */}
        <Route
          path="/dashboard/xo"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["xo"]}>
                <MainLayout>
                  <XODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* RO */}
        <Route
          path="/dashboard/ro"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["ro"]}>
                <MainLayout>
                  <RODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* GO */}
        <Route
          path="/dashboard/go"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["go"]}>
                <MainLayout>
                  <GODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* DO */}
        <Route
          path="/dashboard/do"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["do"]}>
                <MainLayout>
                  <DODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* =============================
              DEPARTMENT HEADS
           ============================= */}

        <Route
          path="/dashboard/eo"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["eo"]}>
                <MainLayout>
                  <EODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/lo"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["lo"]}>
                <MainLayout>
                  <LODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/so"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["so"]}>
                <MainLayout>
                  <SODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mo"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["mo"]}>
                <MainLayout>
                  <MODashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* XO as Department Head (Executive Dept) */}
        <Route
          path="/dashboard/xo-dept"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["xo"]}>
                <MainLayout>
                  <XODepartmentDashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* =============================
                  SAILOR
           ============================= */}

        <Route
          path="/dashboard/sailor"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowed={["sailor"]}>
                <MainLayout>
                  <SailorDashboard />
                </MainLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* =============================
                DRILL‑DOWN VIEWS
           ============================= */}

        <Route
          path="/profile/view/:sailorId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ViewSailorProfile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/division/:divisionId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DivisionView />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/department/:deptName"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DepartmentHeadDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}