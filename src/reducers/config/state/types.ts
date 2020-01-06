export interface ConfigDataJSON {
	readonly wordSources: string[];
	readonly storySource: string;
}

export interface ConfigData {
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly storySource: StoryConfigListData | ConfigUrlData;
    readonly wordSources: WordConfigData[] | ConfigUrlData[];
}

export interface ConfigUrlData {
    readonly configUrl: string;
    readonly loaded: boolean;
}

export interface StoryConfigListData {
    readonly loaded: boolean;
    readonly stories: StoryConfigData[];
}

export interface StoryConfigData {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;
}

export type WordConfigData = WordListConfigData | WordRefConfigData;

export interface WordListConfigData extends WordBaseConfigData {
	readonly words: string[];
}

export interface WordRefConfigData extends WordBaseConfigData {
	readonly ref: string;
}

interface WordBaseConfigData {
	readonly id: string;
	readonly title: string;
	readonly help: string;
}

export interface ConfigProgress {
	readonly current: number;
	readonly total: number;
}
