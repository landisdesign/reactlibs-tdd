import { ConfigUrlData } from './types';

export class ConfigUrl implements ConfigUrlData {
    readonly loaded: boolean = false;

    constructor(readonly url: string) {}

    clone() {
        return new ConfigUrl(this.url);
    }
}
