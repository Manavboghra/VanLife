import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import About from "./pages/About";
import Vans,{loader as vansLoader} from "./pages/Vans/Vans";
import Home from "./pages/Home";
import VansDetails, { 
    loader as vanDetailsLoader,
    action as reviewAction 
} from "./components/VansDetails";
import HostLayout,{loader as HostLayoutLoader} from "./Layout/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Vans/HostVans";
import HostVansDetails, {loader as hostVansDetailsLoader} from "./components/HostVansDetails";
import Details from "./components/Details";
import Pricing from "./components/Pricing";
import Photos from "./components/Photos";
import HostReviews from "./components/HostReviews";
import PageNotFound from "./pages/PageNotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import Signup, {
  action as signupAction,
} from "./pages/Signup";
import AddVans, { action as addvansAction } from "./pages/AddVans";
import requireAuth from "./utils/requireAuth";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="addvans"
          element={<AddVans />}
          action={addvansAction}
          loader={({request}) => requireAuth(request)}
        />
        <Route
          path="login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
        <Route
          path="signup"
          element={<Signup />}
          action={signupAction}
        />
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
            loader={vanDetailsLoader}
            action={reviewAction}
        />

        <Route
          path="host"
          element={<HostLayout />}
          loader={HostLayoutLoader}
        >
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" element={<HostVans />} errorElement={<Error />} />
          <Route
            path="vans/:id"
            element={<HostVansDetails />}
            loader={hostVansDetailsLoader}
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
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;

