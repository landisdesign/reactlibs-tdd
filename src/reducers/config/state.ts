export interface ConfigUrls {
    readonly storySource: string;
    readonly wordSources: string[];
}

export interface ConfigState {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly error?: any;
    readonly storySource: StorySource;
    readonly wordSources: WordSource[];
}

export type StorySource = StoryList | Config;
export type WordSource = Word | Config;

export interface Config {
    readonly loaded: boolean;
    readonly url: string;
}

export interface StoryList {
    readonly loaded: boolean;
    readonly stories: Story[];
}

export interface Story {
    readonly id: string;
    readonly title: string;
    readonly fields: string[];
    readonly template: string;
}

export type Word = WordJSON & {
    loaded: boolean;
}

export type WordJSON = WordRef | WordList;

export interface WordRef extends WordBase {
    readonly ref: string;
}

export interface WordList extends WordBase {
    readonly words: string[];
}

interface WordBase {
	readonly id: string;
	readonly title: string;
	readonly help?: string;
}
