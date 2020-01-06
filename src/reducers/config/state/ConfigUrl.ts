import { ConfigUrlData } from './types';

export class ConfigUrl implements ConfigUrlData {
    readonly loaded: boolean = false;

    constructor(readonly configUrl: string) {}

    clone() {
        return new ConfigUrl(this.configUrl);
    }
}
