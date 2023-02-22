export const hasError = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        if (value.hasOwnProperty("error") && value.error === true) {
          return true;
        } else if (hasError(value)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const endpointApiUrl = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/api/v1.0/market/`;
