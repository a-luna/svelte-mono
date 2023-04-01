export function getHomeTeamIdFromBrooksGameId(game_id: string): string {
	const BB_GAME_ID_REGEX =
		/gid_(?<year>\d{4,4})_(?<month>\d{2,2})_(?<day>\d{2,2})_(?<away_team>[a-z]+)mlb_(?<home_team>[a-z]+)mlb_(?<game_num>\d)/;
	const match = BB_GAME_ID_REGEX.exec(game_id);
	return match?.groups?.home_team ?? '';
}

export const capitalize = (string: string): string =>
	string.charAt(0).toUpperCase() + string.substring(1);

export function formatNumber(input: number | string, precision = 0): string {
	const unformatted = typeof input === 'number' ? input : parseFloat(input);
	return unformatted.toLocaleString('en-US', {
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	});
}
