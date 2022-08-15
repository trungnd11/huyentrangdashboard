import { getAddress } from "../../api/addressApi";
import useFetch from "../../customHook/useFetch"

export default function Address() {
  const { data, loading } = useFetch(getAddress);

  console.log(data);

  return (
    <div className="container-fluid">

    </div>
  )
}
