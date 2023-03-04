import axios from "axios";
import { sApiPath } from "../../common/config";

export function apiFetchMovies(jPageNO = 1) {
  const options = {
    url: `${sApiPath}/CONTENTLISTINGPAGE-PAGE${jPageNO}.json`,
    method: 'GET',
  };
  const promiseAxios = axios(options);
  return promiseAxios;
}
