import { ButtonComponent, Plugin, parseYaml, requestUrl, type MarkdownPostProcessorContext, type RequestUrlParam } from "obsidian";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./views/ExampleView";
import { KenkuController } from "./utils/kenku";
import "virtual:uno.css";
import KenkuButton from "./components/KenkuButton.svelte";

interface ObsidianNoteConnectionsSettings {
	mySetting: string;
}


export interface KenkuButtonParams {
	type: string;
	id: string;
	title: string;
}

const DEFAULT_SETTINGS: ObsidianNoteConnectionsSettings = {
	mySetting: "default",
};

export default class KenkuFMRemotePlugin extends Plugin {
	settings!: ObsidianNoteConnectionsSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();
		await KenkuController.init();

		this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));

		this.addRibbonIcon("dice", "Activate view", () => {
			this.activateView();
		});
		this.registerMarkdownCodeBlockProcessor(
			"kenkufm",
			this.postprocessor.bind(this)
		);

		// this.addCommand({
		// 	id: "kenku-play-track",
		// 	name: "Play Track",
		// 	callback: () => {
		// 		new PlayTrackModal(this.app).open();
		// 	},
		// });

		// this.addCommand({
		// 	id: "kenku-play-sound",
		// 	name: "Play Sound",
		// 	callback: () => {
		// 		new PlaySoundModal(this.app).open();
		// 	},
		// });
	}

	onunload() {
		console.log("unloading plugin");
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0],
		);
	}


	async postprocessor(
		source: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) {
		try {
			let config: KenkuButtonParams = parseYaml(source);
			console.log(config);
			el.addClass("kenkufm-button-container");


			let button = new KenkuButton({
				target: el,
				props: {
					config: config,
				}
			})
			

			// let btn = new ButtonComponent(el).setButtonText(config.title).setCta();


			// btn.onClick(async () => {
			// 	console.log('test')
			// 	KenkuController.playTrack(config.track_id!);
			// 	;
			// });

		} catch (e) {
			console.error(`Kenku FM button Error:\n${e}`);
		}
	}
}
