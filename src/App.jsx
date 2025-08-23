import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import About from "./pages/About";
import Vans, { VansLoader } from "./pages/Vans/Vans";
import Home from "./pages/Home";
import VansDetails, { VansDetailsLoader } from "./components/VansDetails";
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="vans" loader={VansLoader} element={<Vans />} errorElement={<Error/>} />
        <Route
          path="vans/:id"
          element={<VansDetails />}
          loader={VansDetailsLoader}
        />
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" loader={VansLoader} element={<HostVans />} errorElement={<Error/>}/>
          <Route
            path="vans/:id"
            element={<HostVansDetails />}
            loader={VansDetailsLoader}
          >
            <Route index element={<Details />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="photos" element={<Photos />} />
            <Route path="reviews" element={<HostReviews />} />
          </Route>
          <Route path="reviews" loader={VansLoader} element={<Reviews />} errorElement={<Error/>}/>
          <Route path="demo" loader={VansLoader} element={<Demo />} errorElement={<Error/>}/>
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
