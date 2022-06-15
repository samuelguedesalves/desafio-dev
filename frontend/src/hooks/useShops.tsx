import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Api } from "../service/api";
import { Shop } from "../types/Shop";
import { useAuth } from "./useAuth";

type ShopsContextProps = {
  shops: Shop[];
  isLoaded: boolean;
  refreshShopsList: () => void;
};

type ShopsContextProvideProps = {
  children?: React.ReactNode;
};

const ShopsContext = createContext<ShopsContextProps>({} as ShopsContextProps);

export const ShopsProvide: React.FC<ShopsContextProvideProps> = ({
  children,
}) => {
  const { isLogged, token } = useAuth();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [shops, setShops] = useState<Shop[]>([]);

  const fetchShopList = useCallback(() => {
    async function doFetch() {
      await Api.get("/cnab/list", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then((resp) => {
          setShops(resp.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setIsLoaded(false);
        });
    }

    return doFetch();
  }, [token]);

  function refreshShopsList() {
    fetchShopList();
  }

  useEffect(() => {
    if (isLogged) fetchShopList();
  }, [isLogged, fetchShopList]);

  return (
    <ShopsContext.Provider value={{ isLoaded, shops, refreshShopsList }}>
      {children}
    </ShopsContext.Provider>
  );
};

export function useShops() {
  return useContext(ShopsContext);
}
