import { StoryConfigListData, StoryConfigJSON } from './types';
import { StoryConfig } from './StoryConfig';

export class StoryConfigList implements StoryConfigListData {
    loaded: boolean = true;
    stories: StoryConfig[];

    constructor(stories: StoryConfigJSON[]) {
        this.stories = stories.map(story => new StoryConfig(story));
    }

    clone() {
        return new StoryConfigList(this.stories);
    }
}
