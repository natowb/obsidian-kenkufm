import type KenkuFMRemotePlugin from "../main";
import { soundProcessor } from "./soundProcessor";
import { trackProcessor } from "./trackProcessor";

export const registerCodeBlockProcessors = (plugin: KenkuFMRemotePlugin) => {
	plugin.registerMarkdownCodeBlockProcessor("kenkufm-track", trackProcessor);
	plugin.registerMarkdownCodeBlockProcessor("kenkufm-sound", soundProcessor);
};
