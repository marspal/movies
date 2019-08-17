export const normalizePath = path => path.startsWith("/") ? path: `/${path}`
export const parseUrl = (url, param) => {
  if(!param) return url;
  let result = Object.keys(param).reduce((a,b)=> {
    return param[b] ? `${a}${b}=${encodeURIComponent(param[b])}&` : a;
  }, '')
  return `${url}?${result.substring(0, result.length-1)}`;
}

