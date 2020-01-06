import { assign } from '../../../common';

import { WordListConfigData } from "./types";
import { Cloneable } from '../../../common/types';

export class WordListConfig implements WordListConfigData, Cloneable<WordListConfig> {
    loaded: boolean = true;
    id: string = '';
    title: string = '';
    help?: string;
    words: string[] = [];

    constructor(data: WordListConfigData) {
        assign(this, data);
        this.words = [...data.words];
    }

    clone() {
        return new WordListConfig(this);
    }
}
