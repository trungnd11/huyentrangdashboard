import React from 'react'
import { Navigate } from 'react-router-dom';
import { getCookie } from '../components/function/function';
import { Author } from '../enum/Enum';

export default function PublicRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const user = getCookie(Author.USER);
  
  return !user ? children : <Navigate to="/" />
}
