import { Cloneable } from "../../../common/types";

export interface ConfigDataURLs {
	readonly wordSources: string[];
	readonly storySource: string;
}

/*
 *	Pure data types for hydration
 */
export interface ConfigDataJSON {
	readonly loaded: boolean;
    readonly loading: boolean;
    readonly storySource: StorySourceJSON | null;
    readonly wordSources: WordSourceJSON[];
}

export type StorySourceJSON = StoryConfigListJSON | ConfigUrlJSON;

export interface StoryConfigListJSON {
	readonly loaded: boolean;
    readonly stories: StoryConfigJSON[];
}

export interface StoryConfigJSON {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;
}

export interface ConfigUrlJSON {
	readonly loaded: boolean;
	readonly url: string;
}

export type WordSourceJSON = WordConfigJSON | ConfigUrlJSON;

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

/*
 *	Concrete implementation types to complement JSON types
 */
export interface ConfigData extends ConfigDataJSON, Cloneable<ConfigData> {
    readonly storySource: StorySource | null;
    readonly wordSources: WordSource[];

	addStoryConfig: (story: StoryConfigListData) => ConfigData;
	addWordConfig: (word: WordConfigData, index: number) => ConfigData;
}

export type StorySource = StoryConfigListData | ConfigUrlData;

export interface StoryConfigListData extends StoryConfigListJSON, Cloneable<StoryConfigListData> {
	stories: StoryConfigData[];
}

export type StoryConfigData = StoryConfigJSON & Cloneable<StoryConfigData>;

export type ConfigUrlData = ConfigUrlJSON & Cloneable<ConfigUrlData>;

export type WordSource = WordConfigData | ConfigUrlData;
export type WordConfigData = WordListConfigData | WordRefConfigData;
export type WordListConfigData = WordListConfigJSON & Cloneable<WordListConfigData>;
export type WordRefConfigData = WordRefConfigJSON & Cloneable<WordRefConfigData>;

export interface ConfigProgress {
	readonly current: number;
	readonly total: number;
}
