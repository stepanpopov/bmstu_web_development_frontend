import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  isAuth: boolean
  loginPageLink: string
}

const PrivateRoute = ({ isAuth, loginPageLink }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      alert("Сначала войдите в аккаунт")
      navigate(loginPageLink)
    }
  }, [])

  return <Outlet />

};

export default PrivateRoute;
