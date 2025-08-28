import { getVans } from "../../../api";
import requireAuth from "../../utils/requireAuth";

export async function loader() {
  return getVans();
}