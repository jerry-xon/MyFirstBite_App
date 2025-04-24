import { createSelector } from "@reduxjs/toolkit";

export const getAddressByAddressId = createSelector(
  [(addressState) => addressState, (_, addressId) => addressId],
  (addressState, addressId) => {
    const { addressList } = addressState;
    return addressList.find((address) => address.delivery_id === addressId);
  }
);
