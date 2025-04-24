export function isShopOpen(business) {
  const {
    business_open: businessOpen,
    business_close: businessClose,
    user,
  } = business;

  if (user.user_login === false) {
    return false;
  }

  const business_open = businessOpen.split(":").slice(0, 2).join("");
  const business_close = businessClose.split(":").slice(0, 2).join("");

  const openingTime = parseInt(business_open, 10);
  const closingTime = parseInt(business_close, 10);

  // Convert input time to a number
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentTime = parseInt(hours + minutes, 10);

  if (openingTime <= closingTime) {
    // Same day closing
    if (currentTime >= openingTime && currentTime < closingTime) {
      return true;
    }
  } else {
    // Closing after midnight
    if (currentTime >= openingTime || currentTime < closingTime) {
      return true;
    }
  }
  return false;
}
