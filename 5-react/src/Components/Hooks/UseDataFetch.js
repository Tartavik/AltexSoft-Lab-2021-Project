import { useEffect, useReducer } from "react";

const dataFetchReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload.data,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

async function fetchWithStatuses(
  promise,
  dispatch,
  opts = { didCancel: false }
) {
  dispatch({ type: "FETCH_INIT", payload: null });

  try {
    const result = await promise;

    if (!opts.didCancel) {
      dispatch({ type: "FETCH_SUCCESS", payload: result });
    }
  } catch (e) {
    if (!opts?.didCancel) {
      dispatch({ type: "FETCH_FAILURE", payload: e });
    }
  }
}

export const useDataFetch = ({
  fetchHandler,
  initialData = {},
  isLazy = false,
  isLoadingInitial = false,
}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: isLoadingInitial,
    error: null,
    data: initialData,
  });

  const fetchCallBack = (opts) =>
    fetchWithStatuses(fetchHandler(opts), dispatch);

  useEffect(() => {
    const opts = { didCancel: false };

    if (!isLazy && !opts.didCancel) {
      fetchWithStatuses(fetchHandler(), dispatch, opts);
    }

    return () => {
      opts.didCancel = true;
    };
  }, []);

  return [state, fetchCallBack];
};
