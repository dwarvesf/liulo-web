export const createAsyncActions = (baseType = '') => ({
  STARTED: `${baseType}_STARTED`,
  FINISHED: `${baseType}_FINISHED`,
  FAILED: `${baseType}_FAILED`,
});
