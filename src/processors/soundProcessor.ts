import { type MarkdownPostProcessorContext, Notice, parseYaml } from "obsidian";
import SoundboardCard from "../components/SoundboardCard/SoundboardCard.svelte";

export const soundProcessor = async (
	source: string,
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) => {
	el.parentElement?.addClass("mt-2");

	try {
		const config = parseYaml(source);
		console.log(config);
		new SoundboardCard({
			target: el,
			props: {
				config,
			},
		});
	} catch (e) {
		new Notice("Failed to parse yaml and create kenku sound component");
	}
};
