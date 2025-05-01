import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading as setAuthLoading } from "./store/slices/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MainRenderComponent from "./pages/MainRenderComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔥 Firebase user changed:", firebaseUser);

      const first_name = firebaseUser?.displayName?.split(" ")[0] || "unknown";
      const last_name = firebaseUser?.displayName?.split(" ")[1] || "unknown";

      if (!firebaseUser?.uid || !firebaseUser.email) {
        return; // 또는 에러 처리
      }

      const UserInfo = {
        id: firebaseUser?.uid,
        email: firebaseUser?.email,
        first_name: first_name,
        last_name: last_name,
      }

      dispatch(setUser(UserInfo));
      dispatch(setAuthLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainRenderComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;