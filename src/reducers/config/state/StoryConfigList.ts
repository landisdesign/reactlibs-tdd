import { StoryConfigData, StoryConfigListData } from './types';
import { StoryConfig } from './StoryConfig';

export class StoryConfigList implements StoryConfigListData {
    loaded: boolean = true;
    stories: StoryConfigData[];

    constructor(stories: StoryConfigData[]) {
        this.stories = stories.map(story => new StoryConfig(story));
    }

    clone() {
        return new StoryConfigList(this.stories);
    }
}
