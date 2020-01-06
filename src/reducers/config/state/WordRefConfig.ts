import { WordRefConfigData, WordRefConfigJSON } from "./types";
import { assign } from "../../../common";

export class WordRefConfig implements WordRefConfigData {
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
