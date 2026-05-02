// ─── Job listing summary (for careers list page) ─────────────────
export interface JobListing {
	id: string;
	title: string;
	description: string;
	type: "Full-time" | "Contract" | "Part-time";
	location: string;
	href: string;
	tags?: string[];
}

// ─── Job detail (full job posting) ───────────────────────────────
export interface JobDetailSection {
	title: string;
	content: string | string[];
}

export interface JobDetail {
	id: string;
	title: string;
	type: "Full-time" | "Contract" | "Part-time";
	location: "Remote" | "Remote / Dubai" | "Dubai" | "On-site";
	aboutTheRole: string;
	responsibilities: string[];
	requirements: string[];
	niceToHave: string[];
	importantNote?: {
		description: string;
		howItWorks: string[];
	};
}

export const JOB_LISTINGS: JobListing[] = [
	{
		id: "ai-engineer",
		title: "AI Engineer",
		description:
			"Join our program to build cutting-edge AI solutions that power the next generation of intelligent applications. Work with large language models, machine learning pipelines, and scalable AI infrastructure.",
		type: "Full-time",
		location: "Remote / Dubai",
		href: "/careers/ai-engineer",
	},
	{
		id: "ml-engineer",
		title: "ML Engineer",
		description:
			"Design and deploy robust machine learning systems at scale. Build end-to-end ML pipelines, optimize model performance, and collaborate with cross-functional teams to deliver impactful solutions.",
		type: "Full-time",
		location: "Remote / Dubai",
		href: "/careers/ml-engineer",
	},
	{
		id: "fs-engineer",
		title: "Full Stack Engineer",
		description:
			"Build beautiful, performant web applications that deliver exceptional user experiences. Work across the entire stack with modern technologies and collaborate closely with design and product teams.",
		type: "Full-time",
		location: "Remote / Dubai",
		href: "/careers/fs-engineer",
	},
	{
		id: "uiux-designer",
		title: "Junior UI/UX Designer",
		description:
			"We're looking for a junior UI/UX designer to support a small SaaS client on ongoing product and marketing work. You'll work closely with the founder to turn rough ideas into clean, production-ready designs and Framer builds.",
		type: "Contract",
		location: "Remote / Dubai",
		href: "/careers/uiux-designer",
		tags: ["Nairon Team"],
	},
] as const;

// ─── LinkedIn priority link ─────────────────────────────────────
export const LINKEDIN_PRIORITY_LINK = {
	text: 'Get priority screening to the nairon application by commenting "Apply" on Linkedin',
	href: "https://www.linkedin.com/posts/lukaeric_eighteen-months-ago-i-shut-down-everything-activity-7403825696306802691-O8Fi?utm_source=share&utm_medium=member_desktop&rcm=ACoAACwFzyUB8f07Pkw3S36kX6HhVY3JRhYmIao",
} as const;

// ─── Mock job details (fallback data) ────────────────────────────
// This will be replaced by API data from apply.naironai.com
export const JOB_DETAILS: Record<string, JobDetail> = {
	"ai-engineer": {
		id: "ai-engineer",
		title: "AI Engineer",
		type: "Full-time",
		location: "Remote",
		aboutTheRole:
			"We're looking for an AI Engineer who can turn real product problems into working AI features. You will design, build, and ship systems powered by modern language models and other AI models, working closely with product and engineering to get things into production, not just into slide decks.",
		responsibilities: [
			"Design and implement AI powered features such as agents, chat interfaces, retrieval and search, summarization, and automation.",
			"Work with product and engineering teams to translate business requirements into concrete technical solutions.",
			"Integrate language model and AI providers such as OpenAI or Anthropic into existing services and workflows.",
			"Build and maintain pipelines for prompts, evaluation, logging, and observability of AI features.",
			"Optimize for latency, cost, and reliability in production environments.",
			"Write clean and maintainable code with tests and clear documentation.",
			"Collaborate with backend, frontend, and machine learning teammates on end to end solutions.",
			"Stay current on AI tooling and best practices and bring pragmatic improvements into the stack.",
		],
		requirements: [
			"3+ years of professional software engineering experience or equivalent.",
			"Strong coding skills in Python or TypeScript or JavaScript.",
			"Hands on experience building at least one real AI powered feature such as a language model app, retrieval augmented search, or agent.",
			"Good understanding of modern AI concepts including language models, embeddings, vector stores, prompt design, and evaluation.",
			"Experience building and consuming APIs such as REST or GraphQL and working with cloud platforms.",
			"Comfortable working from vague problem statements and breaking them into clear tasks.",
			"Strong communication skills and the ability to work with both technical and non technical stakeholders.",
		],
		niceToHave: [
			"Experience with orchestration frameworks or agent frameworks such as LangGraph or custom tool calling flows.",
			"Experience with vector databases such as Pinecone, Weaviate, or pgvector.",
			"Prior experience in a startup or fast paced environment.",
			"Background in data science or machine learning is a plus but not required.",
		],
		importantNote: {
			description:
				"This posting represents the type of full-time role you can be placed into with one of our partner companies after completing the Nairon program.",
			howItWorks: [
				"Apply to join the Nairon Cohort in Dubai",
				"Complete screening, hackathons, and the 8-week intensive program",
				"Get matched and placed into a position like this one with a Nairon client",
				"Background in data science or machine learning is a plus but not required.",
			],
		},
	},
	"ml-engineer": {
		id: "ml-engineer",
		title: "ML Engineer",
		type: "Full-time",
		location: "Remote",
		aboutTheRole:
			"We're looking for an ML Engineer who can design and deploy robust machine learning systems at scale. You will build end-to-end ML pipelines, optimize model performance, and collaborate with cross-functional teams to deliver impactful solutions.",
		responsibilities: [
			"Design, develop, and deploy machine learning models for production systems.",
			"Build and maintain ML pipelines for training, evaluation, and inference.",
			"Optimize models for performance, latency, and cost in production environments.",
			"Collaborate with data engineers to ensure data quality and availability.",
			"Implement monitoring and alerting for ML systems.",
			"Work with product teams to understand requirements and translate them into technical solutions.",
			"Stay current on ML research and bring relevant improvements to the stack.",
			"Document systems, processes, and best practices.",
		],
		requirements: [
			"3+ years of professional software engineering experience with a focus on ML.",
			"Strong coding skills in Python with experience in ML frameworks like PyTorch or TensorFlow.",
			"Experience deploying ML models to production.",
			"Understanding of ML fundamentals including supervised learning, deep learning, and model evaluation.",
			"Experience with cloud platforms such as AWS, GCP, or Azure.",
			"Strong problem-solving skills and ability to work independently.",
			"Excellent communication skills for technical and non-technical audiences.",
		],
		niceToHave: [
			"Experience with MLOps tools such as MLflow, Kubeflow, or similar.",
			"Experience with distributed training and inference.",
			"Prior experience in a startup or fast paced environment.",
			"Background in a quantitative field such as statistics, mathematics, or physics.",
		],
		importantNote: {
			description:
				"This posting represents the type of full-time role you can be placed into with one of our partner companies after completing the Nairon program.",
			howItWorks: [
				"Apply to join the Nairon Cohort in Dubai",
				"Complete screening, hackathons, and the 8-week intensive program",
				"Get matched and placed into a position like this one with a Nairon client",
				"Background in data science or machine learning is a plus but not required.",
			],
		},
	},
	"fs-engineer": {
		id: "fs-engineer",
		title: "Full Stack Engineer",
		type: "Full-time",
		location: "Remote",
		aboutTheRole:
			"We're looking for a Full Stack Engineer who can build beautiful, performant web applications. You will work across the entire stack with modern technologies and collaborate closely with design and product teams to deliver exceptional user experiences.",
		responsibilities: [
			"Build and maintain full-stack web applications using modern frameworks.",
			"Design and implement APIs and backend services.",
			"Create responsive and accessible user interfaces.",
			"Optimize application performance and user experience.",
			"Write clean, maintainable, and well-tested code.",
			"Collaborate with designers and product managers to deliver features.",
			"Participate in code reviews and help maintain code quality.",
			"Stay current on web technologies and best practices.",
		],
		requirements: [
			"3+ years of professional full-stack development experience.",
			"Strong skills in TypeScript/JavaScript and modern frontend frameworks such as React or Vue.",
			"Experience with backend technologies such as Node.js, Python, or Go.",
			"Experience with databases both SQL and NoSQL.",
			"Understanding of web security best practices.",
			"Experience with version control and CI/CD pipelines.",
			"Strong communication skills and ability to work in a team.",
		],
		niceToHave: [
			"Experience with AI/ML integration in web applications.",
			"Experience with real-time applications using WebSockets.",
			"Prior experience in a startup or fast paced environment.",
			"Experience with mobile development using React Native or similar.",
		],
		importantNote: {
			description:
				"This posting represents the type of full-time role you can be placed into with one of our partner companies after completing the Nairon program.",
			howItWorks: [
				"Apply to join the Nairon Cohort in Dubai",
				"Complete screening, hackathons, and the 8-week intensive program",
				"Get matched and placed into a position like this one with a Nairon client",
				"Background in data science or machine learning is a plus but not required.",
			],
		},
	},
	"uiux-designer": {
		id: "uiux-designer",
		title: "Junior UI/UX Designer",
		type: "Contract",
		location: "Remote",
		aboutTheRole:
			"We're looking for a junior UI/UX designer to support a small SaaS client on ongoing product and marketing work. You'll work closely with the founder to turn rough ideas into clean, production-ready designs and Framer builds.",
		responsibilities: [
			"Create user interface designs for web and mobile applications.",
			"Build interactive prototypes and design systems.",
			"Collaborate with developers to ensure design implementation quality.",
			"Conduct user research and usability testing.",
			"Create marketing materials and landing page designs.",
			"Maintain and extend existing design systems.",
			"Present design work and gather feedback from stakeholders.",
		],
		requirements: [
			"1+ years of UI/UX design experience or strong portfolio.",
			"Proficiency in design tools such as Figma or Sketch.",
			"Experience with Framer or similar no-code tools.",
			"Understanding of responsive design principles.",
			"Basic understanding of HTML, CSS, and design-to-code workflows.",
			"Strong attention to detail and visual design skills.",
			"Excellent communication skills.",
		],
		niceToHave: [
			"Experience with motion design and micro-interactions.",
			"Experience with design systems at scale.",
			"Prior experience in a startup or agency environment.",
			"Familiarity with user research methodologies.",
		],
	},
};

// ─── Helper function to get job detail by ID ─────────────────────
// In production, this will fetch from apply.naironai.com API
export function getJobDetail(id: string): JobDetail | undefined {
	// TODO: Replace with API call to apply.naironai.com
	// const response = await fetch(`https://apply.naironai.com/api/jobs/${id}`);
	// return response.json();
	return JOB_DETAILS[id];
}

// ─── Helper function to get all job details ──────────────────────
export function getAllJobDetails(): JobDetail[] {
	// TODO: Replace with API call to apply.naironai.com
	return Object.values(JOB_DETAILS);
}
