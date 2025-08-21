import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import About from "./pages/About";
import Vans, { VansLoader } from "./pages/Vans";
import Home from "./pages/Home";
import VansDetails, { VansDetailsLoader } from "./components/VansDetails";
import Host from "./pages/Host";
import HostLayout from "./Layout/HostLayout";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Reviews from "./pages/Reviews";
import HostVans from "./pages/HostVans";
import HostVansDetails from "./components/HostVansDetails";
import Details from "./components/Details";
import Pricing from "./components/Pricing";
import Photos from "./components/Photos";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" loader={VansLoader} element={<Vans />} />
        <Route path="vans/:id" element={<VansDetails />} loader={VansDetailsLoader} />
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" loader={VansLoader} element={<HostVans />} />
          <Route path="vans/:id" element={<HostVansDetails />} loader={VansDetailsLoader} >
          <Route index element={<Details />} loader={VansDetailsLoader} />
          <Route path="pricing" element={<Pricing/>} loader={VansDetailsLoader} />
          <Route path="photos" element={<Photos/>} loader={VansDetailsLoader} />
          </Route>
          <Route path="reviews" loader={VansLoader} element={<Reviews />} />
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
