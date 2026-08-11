import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";

const handler = createStartHandler(defaultStreamHandler);

export default {
	async fetch(...args: Parameters<typeof handler>) {
		return await handler(...args);
	},
};
