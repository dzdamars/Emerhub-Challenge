import { stringify as queryStringify } from 'query-string';

export function postBasic(url, jsonData) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(response => parseJSON(response));
}

export function getBasic(url, query) {
  const parsedQuery = query ? queryStringify(query) : '';
  const parsedUrl = `${url}?${parsedQuery}`;
  const options = {
    method: 'GET',
  };
  return fetch(parsedUrl, options)
    .then(checkStatus)
    .then(response => parseJSON(response));
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
