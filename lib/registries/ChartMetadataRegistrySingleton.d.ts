import { Registry } from '@superset-ui/core';
import ChartMetadata from '../models/ChartMetadata';
declare class ChartMetadataRegistry extends Registry<ChartMetadata, ChartMetadata> {
    constructor();
}
declare const getInstance: () => ChartMetadataRegistry;
export default getInstance;
//# sourceMappingURL=ChartMetadataRegistrySingleton.d.ts.map