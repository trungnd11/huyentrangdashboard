import { Navigate } from "react-router-dom";
import { getCookie } from "../components/function/function";
import { Author } from "../enum/Enum";

export default function AuthRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const userJson = getCookie(Author.USER);

  return userJson &&
    JSON.parse(userJson).roles.find(
      (role: string) => role === Author.ROLE_ADMIN
    ) ? (
    children
  ) : (
    <Navigate to="/home" />
  );
}
