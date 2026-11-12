import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import qualityService from "../services/qualities.service";
import { ServerQuality } from "../types/quality";

type QualityContextValue = {
  qualities: ServerQuality[];
  isLoading: boolean;
  error: string | null;
  getQuality: (id: ServerQuality["_id"]) => ServerQuality | undefined;
};

type QualitiesProviderProps = {
  children: ReactNode;
};

const QualityContext = React.createContext<QualityContextValue | null>(null);

export const useQualities = () => {
  const context = useContext(QualityContext);
  if (context === null) throw new Error("useQualities нужно использовать внутри QualitiesProvider");
  return context;
};

const QualitiesProvider = ({ children }: QualitiesProviderProps) => {
  const [qualities, setQualities] = useState<ServerQuality[]>([]);
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
        setError("Не удалось загрузить качества");
      }
    }

    async function getQualitiesList() {
      try {
        const { content } = await qualityService.fetchAll();
        if (!isActual) return;
        setQualities(content);
      } catch (error) {
        if (isActual) errorCatcher(error);
      } finally {
        if (isActual) setIsLoading(false);
      }
    }

    getQualitiesList();

    return () => {
      isActual = false;
    };
  }, []);

  function getQuality(id: ServerQuality["_id"]) {
    return qualities.find((qual) => qual._id === id);
  }

  return (
    <QualityContext.Provider value={{ qualities, isLoading, error, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

export default QualitiesProvider;
