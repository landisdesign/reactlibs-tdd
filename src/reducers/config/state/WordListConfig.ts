import { assign } from '../../../common';

import { WordListConfigData, WordListConfigJSON } from "./types";
import { Cloneable } from '../../../common/types';

export class WordListConfig implements WordListConfigData, Cloneable<WordListConfig> {
    loaded: boolean = true;
    id: string = '';
    title: string = '';
    help?: string;
    words: string[] = [];

    constructor(data: WordListConfigJSON) {
        assign(this, data);
        this.words = [...data.words];
    }

    clone() {
        return new WordListConfig(this);
    }
}
