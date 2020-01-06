export interface ConfigDataJSON {
	readonly wordSources: string[];
	readonly storySource: string;
}

export interface ConfigData {
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly storySource: StorySource;
    readonly wordSources: WordSource[];
}

export type StorySource = StoryConfigListData | ConfigUrlData;

export type WordSource = WordConfigData | ConfigUrlData;

export interface ConfigUrlData extends StatefulSource {
    readonly configUrl: string;
}

interface StatefulSource {
	readonly loaded: boolean;
}

export interface StoryConfigListData extends StatefulSource {
    readonly stories: StoryConfigData[];
}

export interface StoryConfigData {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;
}

export type WordConfigData = WordListConfigData | WordRefConfigData;
export type WordListConfigData = WordListConfigJSON & StatefulSource;
export type WordRefConfigData = WordRefConfigJSON & StatefulSource;
export type WordConfigJSON = WordListConfigJSON | WordRefConfigJSON;

export interface WordListConfigJSON extends WordBaseConfigJSON {
	readonly words: string[];
}

export interface WordRefConfigJSON extends WordBaseConfigJSON {
	readonly ref: string;
}

interface WordBaseConfigJSON {
	readonly id: string;
	readonly title: string;
	readonly help?: string;
}

export interface ConfigProgress {
	readonly current: number;
	readonly total: number;
}
