import axios from 'axios';
import { useEffect } from 'react'
import { getCookie } from '../components/function/function'
import { Author } from '../enum/Enum'

export default function AxiosConfig() {
  const token = getCookie(Author.TOKEN);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return null;
}
