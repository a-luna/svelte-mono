export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.ico","icon-192.png","icon-512.png","icon.svg"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.123f3035.js","imports":["_app/immutable/entry/start.123f3035.js","_app/immutable/chunks/index.ad302cc2.js","_app/immutable/chunks/singletons.a157be81.js","_app/immutable/chunks/index.bec4dd84.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.ec1c9399.js","imports":["_app/immutable/entry/app.ec1c9399.js","_app/immutable/chunks/index.ad302cc2.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
