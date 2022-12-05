/**
 * Provides what hostname should we use:
 *   - urlParam ?hostname=<something>
 *   - cookie host
 *   - the current domain
 * @returns Hostname of the api
 */
export default function getHostname() {
  const currentUrl = new URL(window.location.href);
  const hostOverrideCookie = getHostOverrideCookie();

  return currentUrl.searchParams.get("hostname")
    ? currentUrl.searchParams.get("hostname")
    : hostOverrideCookie
    ? hostOverrideCookie
    : window.location.hostname;
}

export function getHostOverrideCookie() {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith("hostname="))
    ?.split("=")[1];
}

export function setHostOverrideCookie() {
  window.document.cookie = `hostname=${getHostname()}; max-age=2592000;`;
}

export function removeHostOverrideCookie() {
  window.document.cookie = `hostname=; max-age=-1;`;
  window.location.href = window.location.href.replace(
    "hostname=",
    "_oldhostname="
  );
}
