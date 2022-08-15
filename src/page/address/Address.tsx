import { getAddress } from "../../api/addressApi";
import ItemList from "../../components/list/ItemList";
import useFetch from "../../customHook/useFetch";
import { AddressModel } from "../../model/addressModel";

export default function Address() {
  const { data, loading } = useFetch(getAddress);

  console.log(data);

  return (
    <div className="container-fluid">
      {!loading &&
        data.map((item: AddressModel) => (
          <ItemList
            key={item._id}
            title={item.commune}
            content={item.district}
          />
        ))}
    </div>
  );
}
