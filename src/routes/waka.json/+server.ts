import { WAKATIME_API_KEY } from '$env/static/private';
import { api } from '$lib/api';
import { WAKA_API_BASE_URL } from '$lib/siteConfig';
import { error, json } from '@sveltejs/kit';
import { encode } from 'js-base64';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, setHeaders }: RequestEvent) => {
	let range = 'last_7_days';
	if (url.searchParams.has('range')) {
		range = url.searchParams.get('range') ?? 'last_7_days';
	}
	const endpoint = `stats/${range}`;
	const result = await api.get(`${WAKA_API_BASE_URL}/${endpoint}`, {
		type: 'Basic',
		token: encode(WAKATIME_API_KEY)
	});
	if (!result.success) {
		throw error(result.error.status, result.error.message);
	}
	const response = result.value;
	const stats = await response.json().catch(() => ({}));
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${3600}`
	});
	return json(stats);
};

// {
//     "data": {
//         "human_readable_range": "last 6 months",
//         "is_already_updating": false,
//         "is_coding_activity_visible": true,
//         "is_including_today": false,
//         "is_other_usage_visible": true,
//         "is_stuck": false,
//         "is_up_to_date": false,
//         "is_up_to_date_pending_future": false,
//         "percent_calculated": 0,
//         "range": "last_6_months",
//         "status": "pending_update",
//         "timeout": 15,
//         "timezone": "America/Los_Angeles",
//         "username": "aaronluna",
//         "writes_only": false
//     },
//     "message": "Calculating stats for this user. Check back later."
// }

// {
//     "data": {
//         "best_day": null,
//         "created_at": "2022-10-28T14:04:43Z",
//         "categories": [],
//         "daily_average": 10198,
//         "daily_average_including_other_language": 10308,
//         "days_including_holidays": 56,
//         "days_minus_holidays": 53,
//         "dependencies": [],
//         "editors": [],
//         "end": "2022-06-24T06:59:59Z",
//         "holidays": 3,
//         "human_readable_daily_average": "2 hrs 49 mins",
//         "human_readable_daily_average_including_other_language": "2 hrs 51 mins",
//         "human_readable_range": "last 6 months",
//         "human_readable_total": "150 hrs 8 mins",
//         "human_readable_total_including_other_language": "151 hrs 45 mins",
//         "id": "dda2ba52-8d7d-424b-90e4-645562169b44",
//         "is_already_updating": true,
//         "is_coding_activity_visible": true,
//         "is_including_today": false,
//         "is_other_usage_visible": true,
//         "is_stuck": false,
//         "is_up_to_date": false,
//         "is_up_to_date_pending_future": false,
//         "languages": [],
//         "machines": [],
//         "modified_at": "2022-10-28T14:05:41Z",
//         "operating_systems": [ ],
//         "percent_calculated": 30,
//         "projects": [],
//         "range": "last_6_months",
//         "start": "2022-04-29T07:00:00Z",
//         "status": "updating",
//         "timeout": 15,
//         "timezone": "America/Los_Angeles",
//         "total_seconds": 540489.013658,
//         "total_seconds_including_other_language": 546323.067867,
//         "user_id": "a09618a9-d5b9-4a7d-a70d-366f02f85ed9",
//         "username": "aaronluna",
//         "writes_only": false
//     },
//     "message": "Calculating stats for this user. Check back later."
// }
