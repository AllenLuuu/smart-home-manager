export function removeCookie(key: string) {
  console.log(document.cookie);
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function getCookie(key: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}
