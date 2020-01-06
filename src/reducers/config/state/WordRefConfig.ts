import { WordRefConfigData, WordRefConfigJSON } from "./types";
import { assign } from "../../../common";
import { Cloneable } from "../../../common/types";

export class WordRefConfig implements WordRefConfigData, Cloneable<WordRefConfig> {
    loaded: boolean = true;
    id: string = '';
    ref: string = '';
    title: string = '';
    help?: string | undefined;

    constructor(data: WordRefConfigJSON) {
        assign(this, data);
    }

    clone() {
        return new WordRefConfig(this);
    }
}
