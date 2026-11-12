import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import userService from "../services/user.service";
import { ServerUser } from "../types/user";

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = React.createContext<ServerUser[] | null>(null);

export const useUsers = () => {
  const users = useContext(UserContext);
  if (users === null) throw new Error("useUsers нужно использовать внутри UserProvider");
  return users;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<ServerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActual = true;

    function errorCatcher(error: unknown) {
      if (axios.isAxiosError<{ message?: unknown }>(error)) {
        const serverMessage = error.response?.data?.message;
        const hasServerMessage =
          typeof serverMessage === "string" && serverMessage.trim().length > 0;
        setError(hasServerMessage ? serverMessage : error.message);
      } else {
        setError("Не удалось загрузить пользователей");
      }
    }

    async function getUsers() {
      try {
        const { content } = await userService.get();
        if (!isActual) return;

        setUsers(content);
      } catch (error) {
        if (isActual) errorCatcher(error);
      } finally {
        if (isActual) setIsLoading(false);
      }
    }

    getUsers();

    return () => {
      isActual = false;
    };
  }, []);

  return (
    <UserContext.Provider value={users}>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && error !== null && <h3>{error}</h3>}
      {!isLoading && error === null && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
