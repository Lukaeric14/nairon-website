export const FLUX_INSTALL_COMMAND =
	"/plugin add https://github.com/Nairon-AI/flux@latest";

export const FLUX_INSTALL_PROMPT = `Install Flux. README: https://github.com/Nairon-AI/flux`;

export const FLUX_UNINSTALL_PROMPT = `Help me completely uninstall Flux from this environment.

First detect which agent/platform this environment is using for Flux (Codex, Claude Code, OpenCode, etc.).
Use the correct uninstall path for this platform.
Handle as much as you can yourself.
Only stop when I need to run a slash command, confirm removal, or restart the session.

Remove project-local Flux state (.flux) unless I ask to keep it.
Offer machine-level cleanup separately before removing caches or global Flux data.
When finished, verify Flux is no longer installed and tell me whether I need to restart anything.`;
