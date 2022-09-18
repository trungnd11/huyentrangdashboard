/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useFetch(actionApi: any) {
  const [data, setData] = useState<any[]>([]);
  const [item, setItem] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const fetApi = async () => {
    try {
      setLoading(true);
      const response = await actionApi();
      setData(response.data);
      setItem(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetApi()
  }, []);

  useEffect(() => {
    fetApi();
  }, [reset])

  return { data, error, loading, setReset, item };
}
