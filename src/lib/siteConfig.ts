import { dev } from '$app/environment';

export const SITE_URL = dev ? 'http://localhost:3504' : 'https://portfolio.aaronluna.dev';
export const GH_USER = 'a-luna';
export const APPROVED_POSTERS_GH_USERNAME = [GH_USER];
export const PUBLISH_TAGS = ['Published'];
export const GH_USER_REPO = `${GH_USER}/portfolio-site`; // used for pulling github issues and offering comments
export const REPO_URL = `https://github.com/${GH_USER_REPO}`;
export const API_BASE_URL = `https://api.github.com`;
export const SITE_TITLE = 'Project Portfolio';
export const SITE_DESCRIPTION = 'Completed and nearly';
export const DEFAULT_OG_IMAGE = '/AaronLuna.jpg';
export const MY_TWITTER_HANDLE = 'aaronlunadev';
export const MY_EMAIL = 'contact@aaronluna.dev';
export const BLOG_POST_FOLDER = 'src/lib/content/blog';
export const API_TUTORIAL_FOLDER = 'src/lib/content/flask-api-tutorial';
export const BLOG_IMAGE_ROOT = `${SITE_URL}/images/blog`;
export const API_TUTORIAL_IMAGE_ROOT = `${SITE_URL}/images/flask-api-tutorial/post_images`;
export const MEDIA_ROOT = `${SITE_URL}/media`;

// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
