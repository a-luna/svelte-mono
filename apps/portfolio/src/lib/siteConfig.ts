import { dev } from '$app/environment';

export const SITE_URL = dev ? 'http://localhost:3504' : 'https://portfolio.aaronluna.dev';
export const SITE_TITLE = 'Aaron Luna';
export const SITE_DESCRIPTION = 'Your passport to the world of Aaron Luna';
export const THEME_COLOR = '#0D0D0D';

export const GH_USER = 'a-luna';
export const AUTHOR_NAME = 'Aaron Luna';
export const APPROVED_POSTERS_GH_USERNAME = [GH_USER];
export const PUBLISH_TAGS = ['Published'];

export const GH_USER_REPO = `${GH_USER}/portfolio-site`; // used for pulling github issues and offering comments
export const REPO_URL = `https://github.com/${GH_USER_REPO}`;

export const API_BASE_URL = `https://api.github.com`;
export const WAKA_API_BASE_URL = 'https://wakatime.com/api/v1/users/aaronluna';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/AaronLuna.jpg`;
export const MY_TWITTER_HANDLE = 'aaronlunadev';
export const MY_EMAIL = 'contact@aaronluna.dev';

export const BLOG_POST_FOLDER = 'blog';
export const BLOG_IMAGE_ROOT = `${SITE_URL}/images/blog`;
export const BLOG_POST_URL_ROOT = `${SITE_URL}/blog`;

export const API_TUTORIAL_FOLDER = 'flask-api-tutorial';
export const API_TUTORIAL_IMAGE_ROOT = `${SITE_URL}/images/flask-api-tutorial`;
export const API_TUTORIAL_URL_ROOT = `${SITE_URL}/series/flask-api-tutorial`;

// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
