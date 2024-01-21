import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoading, useUser } from "../../store/user";

interface Props {
  loginPageLink: string
}

const PrivateRoute = ({ loginPageLink }: Props) => {
  const navigate = useNavigate()

  const isAuth = !!useUser()
  const loading = useLoading()

  useEffect(() => {
    if (!isAuth && !loading) {
      alert("Сначала войдите в аккаунт")
      navigate(loginPageLink)
    }
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return <Outlet />

};

export default PrivateRoute;
