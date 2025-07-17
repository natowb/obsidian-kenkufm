import { Plugin } from "obsidian";
import "virtual:uno.css";
import { InsertSoundboardModal, InsertTrackModal } from "./modals";
import { registerCodeBlockProcessors } from "./processors";
import * as kenkuConnector from "./kenku/kenkuConnector";
import { isKenkuConnected } from "./stores/kenkuStore";

interface ObsidianNoteConnectionsSettings {
	mySetting: string;
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
		registerCodeBlockProcessors(this);
		this.addCommand({
			id: "kenku-insert-track",
			name: "Insert Track",
			callback: () => {
				new InsertTrackModal(this.app).open();
			},
		});

		this.addCommand({
			id: "kenku-insert-soundboard",
			name: "Insert Soundboard",
			callback: () => {
				new InsertSoundboardModal(this.app).open();
			},
		});

		await kenkuConnector.connect();

		// this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));

		// this.addRibbonIcon("dice", "Activate view", () => {
		// 	this.activateView();
		// });
	}

	onunload() {
		kenkuConnector.stopPolling();
		isKenkuConnected.set(false);
	}

	// async activateView() {
	// 	this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

	// 	await this.app.workspace.getRightLeaf(false).setViewState({
	// 		type: VIEW_TYPE_EXAMPLE,
	// 		active: true,
	// 	});

	// 	this.app.workspace.revealLeaf(
	// 		this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0],
	// 	);
	// }
}
