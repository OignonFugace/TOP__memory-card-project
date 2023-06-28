import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContextProvider";
import Loading from "../../pages/Loading";

function AppLoader({ children }) {
	const { isAppLoading, setIsAppLoading } = useContext(AppContext);

  useEffect(() => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAppLoading(false);
    }, 0);
  }, []);
	
	return isAppLoading ? <Loading /> : children;
}

export default AppLoader;
