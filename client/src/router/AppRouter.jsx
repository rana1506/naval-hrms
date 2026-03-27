import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// Auth Pages
import Login from "../pages/Login";
import SignupOfficer from "../pages/SignupOfficer";
import SignupSailor from "../pages/SignupSailor";
import NotFound from "../pages/NotFound";

// Dashboards
import AdminDashboard from "../pages/AdminDashboard";
import CODashboard from "../pages/CODashboard";
import XODashboard from "../pages/XODashboard";
import RODashboard from "../pages/RODashboard";
import GODashboard from "../pages/GODashboard";
import DODashboard from "../pages/DODashboard";
import SailorDashboard from "../pages/SailorDashboard";

// Department Heads
import EODashboard from "../pages/EODashboard";
import LODashboard from "../pages/LODashboard";
import SODashboard from "../pages/SODashboard";
import MODashboard from "../pages/MODashboard";
import XODepartmentDashboard from "../pages/XODepartmentDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup/officer" element={<SignupOfficer />} />
        <Route path="/signup/sailor" element={<SignupSailor />} />

        {/* Protected Routes */}
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

        {/* Department Heads */}
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

        {/* Sailor Dashboard */}
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

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}