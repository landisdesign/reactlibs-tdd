import { assign } from '../../../common';

import { WordListConfigData, WordListConfigJSON } from "./types";

export class WordListConfig implements WordListConfigData {
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
