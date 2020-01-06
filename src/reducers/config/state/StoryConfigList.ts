import { StoryConfigData, StoryConfigListData } from './types';
import { StoryConfig } from './StoryConfig';
import { Cloneable } from '../../../common/types';

export class StoryConfigList implements StoryConfigListData, Cloneable<StoryConfigList> {
    loaded: boolean = true;
    stories: StoryConfigData[];

    constructor(stories: StoryConfigData[]) {
        this.stories = stories.map(story => new StoryConfig(story));
    }

    clone() {
        return new StoryConfigList(this.stories);
    }
}
