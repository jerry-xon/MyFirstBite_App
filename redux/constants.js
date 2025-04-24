export const FETCH_STATES = {
  NOT_STARTED: "Not-Started",
  IN_PROGRESS: "In-Progress",
  ERROR: "Error",
  COMPLETED: "Completed",
};

export const initialFetchState = FETCH_STATES.NOT_STARTED;

export const commonInitialState = {
  fetchState: initialFetchState,
  error: undefined,
};
