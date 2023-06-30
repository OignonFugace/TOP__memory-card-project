import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContextProvider";
import Loading from "../../pages/Loading";
import { preloadImages } from "../../utils/deck";

function AppLoader({ children }) {
  const { isAppLoading, setIsAppLoading } = useContext(AppContext);

  useEffect(() => {
    setIsAppLoading(true);

    const imagePaths = [ process.env.PUBLIC_URL + "/images/flora/back_05.png" ];
    const loadingImages = preloadImages(imagePaths);
    // const timer = new Promise((resolve) => setTimeout(resolve, 2000))

    Promise.all([loadingImages]).then(() => setIsAppLoading(false));
  }, []);

  return isAppLoading ? <Loading /> : children;
}

export default AppLoader;
