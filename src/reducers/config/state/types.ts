import { Cloneable } from "../../../common/types";

export interface ConfigDataJSON {
	readonly wordSources: string[];
	readonly storySource: string;
}

export interface ConfigData extends StatefulSource<ConfigData> {
    readonly loading: boolean;
    readonly storySource: StorySource | null;
    readonly wordSources: WordSource[];
}

interface StatefulSource<T> extends Cloneable<T> {
	readonly loaded: boolean;
}

export type StorySource = StoryConfigListData | ConfigUrlData;

export type WordSource = WordConfigData | ConfigUrlData;

export interface ConfigUrlData extends StatefulSource<ConfigUrlData> {
    readonly url: string;
}

export interface StoryConfigListData extends StatefulSource<StoryConfigListData> {
    readonly stories: StoryConfigData[];
}

export interface StoryConfigData {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;
}

export type WordConfigData = WordListConfigData | WordRefConfigData;
export type WordListConfigData = WordListConfigJSON & StatefulSource<WordListConfigData>;
export type WordRefConfigData = WordRefConfigJSON & StatefulSource<WordRefConfigData>;
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
