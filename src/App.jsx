import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import About from "./pages/About/About";
import Vans from "./pages/Vans/Vans";
import Home from "./pages/Home/Home";
import VansDetails,{loader as VansDetailsLoader, action as VansDetailsAction} from "./components/VansDetails";
import HostLayout,{loader as HostLayoutLoader} from "./Layout/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVansDetails,{loader as HostVansDetailsLoader} from "./components/HostVansDetails";
import HostDetails from "./pages/Host/Vans/HostDetails";
import HostPricing from "./pages/Host/Vans/HostPricing";
import HostPhotos from "./pages/Host/Vans/HostPhotos";
import HostReviews from "./pages/Host/Vans/HostReviews";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Account/Login";
import Signup, {
  loader as sigupLoader,
  action as signupAction,
} from "./pages/Account/Signup";
import AddVans, { action as addvansAction } from "./pages/AddVans/AddVans";
import requireAuth from "./utils/requireAuth";
import HostIncome from "./pages/Host/Vans/HostIncome";
import UpdateVans from "./pages/Host/UpdateVans";
import UpdateVanDetails,{loader as UpdateVanDetailsLoader, action as UpdateVanDetailsAction} from "./components/UpdateVanDetails";
import Cart,{loader as CartLoader} from "./pages/Cart/Cart";
import Booking,{loader as BookingLoader} from "./pages/Host/Booking";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} loader={CartLoader} />
        <Route
          path="addvans"
          element={<AddVans />}
          action={addvansAction}
          loader={({ request }) => {
            return requireAuth(new URL(request.url).pathname) 
          }}
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
          loader={sigupLoader}
          action={signupAction}
        />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="vans"
          element={<Vans />}
          errorElement={<Error />}
        />
        <Route path="vans/:id" element={<VansDetails />} loader={VansDetailsLoader} action={VansDetailsAction}/>

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
            loader={HostVansDetailsLoader}
            
          >
            <Route index element={<HostDetails />} />
            <Route path="pricing" element={<HostPricing />} />
            <Route path="photos" element={<HostPhotos />} />
            <Route path="reviews" element={<HostReviews />} />
            <Route path="income" element={<HostIncome/>}/>
          </Route>
          <Route
            path="reviews"
            element={<Reviews />}
            errorElement={<Error />}
          />
          <Route
            path="updatevans"
            element={<UpdateVans />}
            errorElement={<Error />}
          />
          <Route
            path="updatevans/:id"
            element={<UpdateVanDetails />}
            loader={UpdateVanDetailsLoader}
            errorElement={<Error />}
            action={UpdateVanDetailsAction}
          />
          <Route
            path="booking"
            element={<Booking />}
            loader={BookingLoader}
          />
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
