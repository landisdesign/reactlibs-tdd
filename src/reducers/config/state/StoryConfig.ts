import { assign } from '../../../common';

import { StoryConfigData, StoryConfigJSON } from "./types";


export class StoryConfig implements StoryConfigData {
    id: string = '';
    title: string = '';
    fields: string[] = [];
    template: string = '';

    constructor(data: StoryConfigJSON) {
        assign(this, data);
        this.fields = [...this.fields];
    }

    clone() {
        return new StoryConfig(this);
    }
}
