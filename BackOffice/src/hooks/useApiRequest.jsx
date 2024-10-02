import React, { useEffect, useState, useCallback } from "react";

/**
 * Hook para fazer requisições HTTP (GET, POST, PUT, PATCH, DELETE).
 *
 * @param {string} url - A URL base para fazer as requisições.
 * @returns {object} - Um objeto contendo os seguintes valores:
 *   - data: Os dados retornados pela requisição.
 *   - httpConfig: Função para configurar e disparar requisições HTTP.
 *   - loading: Booleano indicando se a requisição está em andamento.
 *   - error: Mensagem de erro, se houver.
 *
 * @example
 * const { data, httpConfig, loading, error } = useApiRequest('https://api.example.com/items');
 */
export const useApiRequest = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(null);

  // Lê a variável de ambiente
  const showOriginalError = import.meta.env.VITE_SHOW_ORIGINAL_ERROR === 'true';

  // Função para configurar a requisição HTTP
  const httpConfig = useCallback((data, method) => {
    const headers = {
      "Content-Type": "application/json",
    };

    let configObject = {
      method,
      headers,
    };

    if (method === "POST" || method === "PUT" || method === "PATCH") {
      configObject.body = JSON.stringify(data);
    }

    if (method === "PUT" || method === "PATCH" || method === "DELETE") {
      setItemId(data.id || data);
    }

    setConfig(configObject);
    setMethod(method);
  }, []);

  // Efeito para a requisição inicial (GET)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.message || "Erro na requisição");
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(showOriginalError 
          ? `Houve algum erro ao carregar os dados: ${error.message}` 
          : "Houve algum erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch, showOriginalError]);

  // Efeito para requisições POST, PUT, PATCH, DELETE
  useEffect(() => {
    const httpRequest = async () => {
      if (!method) return;

      setLoading(true);
      try {
        const endpoint = (method === "PUT" || method === "PATCH" || method === "DELETE") ? `${url}/${itemId}` : url;
        const res = await fetch(endpoint, config);
        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.message || "Erro na requisição");
        }
        const json = await res.json();
        setCallFetch((prev) => !prev);
      } catch (error) {
        setError(showOriginalError 
          ? `Houve algum erro na requisição: ${error.message}` 
          : "Houve algum erro na requisição.");
      } finally {
        setLoading(false);
      }
    };

    httpRequest();
  }, [config, method, url, itemId, showOriginalError]);

  return { data, httpConfig, loading, error };
};
