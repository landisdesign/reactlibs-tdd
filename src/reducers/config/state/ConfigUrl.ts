import { Cloneable } from '../../../common/types';

import { ConfigUrlData } from './types';

export class ConfigUrl implements ConfigUrlData, Cloneable<ConfigUrl> {
    readonly loaded: boolean = false;

    constructor(readonly configUrl: string) {}

    clone() {
        return new ConfigUrl(this.configUrl);
    }
}
