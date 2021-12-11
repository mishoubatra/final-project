import { AsyncStorageStatic } from "react-native";

export const getMinutesTillExpire = (expirationDate) => {
  return Math.round(
    (new Date(expirationDate).getTime() - new Date().getTime()) / 60000
  );
};

export const isUserValid = (authExpiryDate) => {
  if (getMinutesTillExpire(authExpiryDate) <= 0) {
    return false;
  }
  return true;
};

export const saveCredentialsToStorage = (token, userId, expirationDate) => {
  AsyncStorageStatic.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate,
    })
  );
};
