import { createServerFn } from "@tanstack/react-start";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";
import { notifyHive } from "./hive-notify";

interface ContactFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
}

export const submitContactForm = createServerFn({ method: "POST" })
	.inputValidator((data: ContactFormData) => data)
	.handler(async ({ data }) => {
		const firstName = data.firstName.trim();
		const lastName = data.lastName.trim();
		const email = data.email.trim().toLowerCase();
		const phone = (data.phone ?? "").trim();
		const message = data.message.trim();

		if (!firstName || !lastName || !email || !message) {
			throw new Error("Missing required fields");
		}

		const convexUrl =
			process.env.CONVEX_URL ??
			process.env.VITE_CONVEX_URL ??
			import.meta.env.VITE_CONVEX_URL;

		if (!convexUrl) {
			throw new Error("Convex URL is not configured");
		}

		// Persists to the contactSubmissions table and fires the Slack notification.
		const convex = new ConvexHttpClient(convexUrl);
		await convex.action(api.contact.submitContactForm, {
			firstName,
			lastName,
			email,
			phone,
			message,
		});

		await notifyHive({
			form: "Contact",
			fields: {
				Name: `${firstName} ${lastName}`,
				Email: email,
				Phone: phone,
				Message: message,
			},
		});

		return { success: true };
	});
