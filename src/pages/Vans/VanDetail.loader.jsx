import { getVanById } from "../../../api"
import RequireAuth from "../../utils/RequireAuth"

export async function loader({ params }) {
    await RequireAuth()
    return getVanById(params.id)

}