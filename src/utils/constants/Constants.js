const BASE_URL_CONTENT = "http://localhost:8081/api/v1/content_management/";

export const base_url_likes = `${BASE_URL_CONTENT}likes`;

export const base_url_comments = `${BASE_URL_CONTENT}comments`;

export const base_url_posts = `${BASE_URL_CONTENT}posts`;

export const base_url_reports = `${BASE_URL_CONTENT}reports`;

export const base_url_ms_auth = "http://localhost:8080/api/v1/authentication/";

export const base_url_ms_users = "http://localhost:8083/";

export const token = sessionStorage.getItem("token");

export const user = JSON.parse(sessionStorage.getItem("user"));

export const authorities = getAuthorities();

function getAuthorities() {
  let authorities = [];
  if (user != null) {
    for (let i = 0; i < user.authorities.length; i++)
      authorities.push(user.authorities[i].authority);
  }
  return authorities;
}
