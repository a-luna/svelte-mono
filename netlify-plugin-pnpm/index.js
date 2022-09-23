export const onPreBuild = async ({ utils: { build, run } }) => {
	try {
		await run.command('npm install -g pnpm');
		await run.command('pnpm install --frozen-lockfile=false --legacy-peer-deps');
	} catch (error) {
		return build.failBuild(error);
	}
};
