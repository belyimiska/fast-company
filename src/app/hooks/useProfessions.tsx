import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import professionService from "../services/profession.service";
import { ServerProfession } from "../types/profession";

type ProfessionProviderProps = {
  children: ReactNode;
};

type ProfessionContextValue = {
  professions: ServerProfession[];
  isLoading: boolean;
  error: string | null;
  getProfession: (id: ServerProfession["_id"]) => ServerProfession | undefined;
};

const ProfessionContext = React.createContext<ProfessionContextValue | null>(null);

export const useProfessions = () => {
  const context = useContext(ProfessionContext);
  if (context === null)
    throw new Error("useProfessions нужно использовать внутри ProfessionProvider");
  return context;
};

const ProfessionProvider = ({ children }: ProfessionProviderProps) => {
  const [professions, setProfessions] = useState<ServerProfession[]>([]);
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
        setError("Не удалось загрузить профессии");
      }
    }

    async function getProfessionsList() {
      try {
        const { content } = await professionService.get();
        if (!isActual) return;
        setProfessions(content);
      } catch (error) {
        if (isActual) errorCatcher(error);
      } finally {
        if (isActual) setIsLoading(false);
      }
    }

    getProfessionsList();

    return () => {
      isActual = false;
    };
  }, []);

  function getProfession(id: ServerProfession["_id"]) {
    return professions.find((prof) => prof._id === id);
  }

  return (
    <ProfessionContext.Provider value={{ professions, isLoading, error, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  );
};

export default ProfessionProvider;
