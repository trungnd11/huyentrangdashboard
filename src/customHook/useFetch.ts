/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useFetch(actionApi: any) {
  const [data, setData] = useState([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await actionApi();
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}
