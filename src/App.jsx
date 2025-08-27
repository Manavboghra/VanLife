import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import Home from "./pages/Home";
import VansDetails   from "./components/VansDetails";
import HostLayout from "./Layout/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import Demo from "./pages/Host/Demo";
import HostVans from "./pages/Vans/HostVans";
import HostVansDetails from "./components/HostVansDetails";
import Details from "./components/Details";
import Pricing from "./components/Pricing";
import Photos from "./components/Photos";
import HostReviews from "./components/HostReviews";
import PageNotFound from "./pages/PageNotFound";
import Error from "./components/Error";
import Login,{loader as loginLoader, action as loginAction} from "./pages/Login";
import { loader as vansLoader } from "./pages/Vans/Vans.loader";
import { loader as vansDetails } from "./pages/Vans/VanDetail.loader";
import RequireAuth from "./utils/RequireAuth";
import Signup,{loader as sigupLoader, action as signupAction} from "./pages/Signup";
import AddVans,{action as addvansAction} from "./pages/AddVans";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="addvans" element={<AddVans />} action={addvansAction}/>
        <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
        <Route path="signup" element={<Signup />} loader={sigupLoader} action={signupAction} />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="vans"
          loader={vansLoader}
          element={<Vans />}
          errorElement={<Error />}
        />
        <Route
          path="vans/:id"
          element={<VansDetails />}
          loader={vansDetails}
        />
        <Route path="host" element={<HostLayout />} loader={vansLoader}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" element={<HostVans />} errorElement={<Error />} />
          <Route
            path="vans/:id"
            element={<HostVansDetails />}
            loader={vansDetails}
          >
            <Route index element={<Details />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="photos" element={<Photos />} />
            <Route path="reviews" element={<HostReviews />} />
          </Route>
          <Route
            path="reviews"
            element={<Reviews />}
            errorElement={<Error />}
          />
          <Route path="demo" element={<Demo />} errorElement={<Error />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} hydrateFallback={<div>Loading...</div>} />
    </>
  );
}
export default App;
