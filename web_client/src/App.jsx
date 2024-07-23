import Authentication from "./pages/Authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SecuredRoute from "./pages/SecuredRoute";
import NoPageFound from "./pages/NoPageFound";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SecuredRoute requireAuth={true}>
        <Home />
      </SecuredRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <SecuredRoute requireAuth={false}>
        <Authentication isRegister={false} />
      </SecuredRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <SecuredRoute requireAuth={false}>
        <Authentication isRegister={true} />
      </SecuredRoute>
    ),
  },
  {
    path: "/*",
    element: <NoPageFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
