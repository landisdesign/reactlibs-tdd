import { ConfigData, StorySource, WordSource, ConfigDataURLs, StoryConfigListData, WordConfigData, ConfigDataJSON, ConfigProgress } from './types';
import { ConfigUrl } from './ConfigUrl';
import { StoryConfigList } from './StoryConfigList';
import { WordRefConfig } from './WordRefConfig';
import { WordListConfig } from './WordListConfig';

export class Config implements ConfigData {
    loading: boolean;
    loaded: boolean;
    storySource: StorySource | null;
    wordSources: WordSource[];

    constructor(data?: ConfigData | ConfigDataJSON | ConfigDataURLs) {
        if (data === undefined) {
            this.loading = false;
            this.loaded = false;
            this.storySource = null;
            this.wordSources = [];
        }
        else if ('loaded' in data) {
            this.loading = data.loading;
            this.loaded = data.loaded;
            if ('clone' in data) {
                this.storySource = data.storySource && data.storySource.clone();
                this.wordSources = data.wordSources.map(word => word.clone());
            }
            else {
                this.storySource = data.storySource
                    && ('stories' in data.storySource
                        ? new StoryConfigList(data.storySource.stories)
                        : new ConfigUrl(data.storySource.url)
                    )
                ;
                this.wordSources = data.wordSources.map(
                    word => 'url' in word
                        ? new ConfigUrl(word.url)
                        : ('ref' in word ? new WordRefConfig(word) : new WordListConfig(word))
                );
            }
        }
        else {
            this.loading = true;
            this.loaded = false;
            this.storySource = new ConfigUrl(data.storySource);
            this.wordSources = data.wordSources.map(url => new ConfigUrl(url));
        }
    }

    addStoryConfig(story: StoryConfigListData): ConfigData {
        const data = {
            ...this,
            storySource: story
        };
        return new Config(data);
    }

    addWordConfig(word: WordConfigData, index: number): ConfigData {

        if (index < 0 || index > this.wordSources.length - 1) {
            throw new Error(`index ${index} must be between 0 and ${this.wordSources.length - 1}`);
        }

        const data = {
            ...this,
            wordSources: [...this.wordSources]
        };
        data.wordSources[index] = word;
        return new Config(data);
    }

    getProgress(): ConfigProgress {
        const storyLoadCount: number = (this.storySource && this.storySource.loaded) ? 1 : 0;
        const total = (this.storySource ? 1 : 0) + this.wordSources.length;
        let current = this.wordSources.reduce((c, source) => c + (source.loaded ? 1 : 0), storyLoadCount);
        return {
            total,
            current
        };
    }

    clone(): Config {
        return new Config(this);
    }
}
