import { getVans } from "../../../api";
import RequireAuth from "../../utils/RequireAuth";

export async function loader() {
    await RequireAuth();
  return getVans();
}