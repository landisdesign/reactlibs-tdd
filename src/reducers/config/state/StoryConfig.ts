import { assign } from '../../../common';
import { Cloneable } from '../../../common/types';

import { StoryConfigData } from "./types";


export class StoryConfig implements StoryConfigData, Cloneable<StoryConfig> {
    id: string = '';
    title: string = '';
    fields: string[] = [];
    template: string = '';

    constructor(data: StoryConfigData) {
        assign(this, data);
        this.fields = [...this.fields];
    }

    clone() {
        return new StoryConfig(this);
    }
}
