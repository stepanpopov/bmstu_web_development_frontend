import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoading, useUser } from "../../store/user";
import { Loader } from "../Loader/Loader";

const PrivateRoute = (loginPageLink: string, mainPageLink: string, checkModerator: boolean) => {
  const navigate = useNavigate()

  const user = useUser()
  const isAuth = !!useUser()
  const loading = useLoading()

  useEffect(() => {
    if (checkModerator && (user?.role !== 'moderator' && !loading)) {
      alert("Сначала войдите в аккаунт модератора")
      navigate(mainPageLink)
    }

    if (!checkModerator && (!isAuth && !loading)) {
      alert("Сначала войдите в аккаунт")
      navigate(loginPageLink)
    }
  }, [user, isAuth, loading])

  if (loading) {
    return <Loader />
  }

  return <Outlet />
};

interface Props {
  loginPageLink: string
  mainPageLink: string
}

export const PrivateRouteUser = ({ loginPageLink, mainPageLink }: Props) => {
  return PrivateRoute(loginPageLink, mainPageLink, false)
};

export const PrivateRouteModerator = ({ loginPageLink, mainPageLink }: Props) => {
  return PrivateRoute(loginPageLink, mainPageLink, true)
};
