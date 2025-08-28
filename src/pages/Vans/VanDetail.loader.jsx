import { getVanById } from "../../../api"

export async function loader({ params }) {
    return getVanById(params.id)

}