import { dev } from "$app/env";

export const SITE_URL = dev
  ? "http://localhost:3005"
  : "https://portfolio-wip.netlify.app";
export const APPROVED_POSTERS_GH_USERNAME = ["a-luna"];
export const GH_USER_REPO = "a-luna/portfolio-site"; // used for pulling github issues and offering comments
export const REPO_URL = "https://github.com/" + GH_USER_REPO;
export const SITE_TITLE = "Project Portfolio";
export const SITE_DESCRIPTION = "Completed and nearly";
export const DEFAULT_OG_IMAGE = "/AaronLuna.jpg";
export const MY_TWITTER_HANDLE = "aaronlunadev";
export const MY_EMAIL = "contact@aaronluna.dev";

// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
