import { FunctionComponent, ComponentType } from 'react';
import { Plugin } from '@superset-ui/core';
import { QueryFormData } from '@superset-ui/query';
import ChartMetadata from './ChartMetadata';
import { BuildQueryFunction, TransformProps } from '../types/TransformFunction';
import { ChartControlPanel } from './ChartControlPanel';
export declare type PromiseOrValue<T> = Promise<T> | T;
export declare type PromiseOrValueLoader<T> = () => PromiseOrValue<T>;
export declare type ChartType = ComponentType<any> | FunctionComponent<any>;
declare type ValueOrModuleWithValue<T> = T | {
    default: T;
};
interface ChartPluginConfig<T extends QueryFormData> {
    metadata: ChartMetadata;
    /** Use buildQuery for immediate value. For lazy-loading, use loadBuildQuery. */
    buildQuery?: BuildQueryFunction<T>;
    /** Use loadBuildQuery for dynamic import (lazy-loading) */
    loadBuildQuery?: PromiseOrValueLoader<ValueOrModuleWithValue<BuildQueryFunction<T>>>;
    /** Use transformProps for immediate value. For lazy-loading, use loadTransformProps.  */
    transformProps?: TransformProps;
    /** Use loadTransformProps for dynamic import (lazy-loading) */
    loadTransformProps?: PromiseOrValueLoader<ValueOrModuleWithValue<TransformProps>>;
    /** Use Chart for immediate value. For lazy-loading, use loadChart. */
    Chart?: ChartType;
    /** Use loadChart for dynamic import (lazy-loading) */
    loadChart?: PromiseOrValueLoader<ValueOrModuleWithValue<ChartType>>;
    /** Control panel configuration object */
    controlPanel?: ChartControlPanel;
}
export default class ChartPlugin<T extends QueryFormData = QueryFormData> extends Plugin {
    controlPanel: ChartControlPanel;
    metadata: ChartMetadata;
    loadBuildQuery?: PromiseOrValueLoader<BuildQueryFunction<T>>;
    loadTransformProps: PromiseOrValueLoader<TransformProps>;
    loadChart: PromiseOrValueLoader<ChartType>;
    constructor(config: ChartPluginConfig<T>);
    register(): this;
    unregister(): this;
    configure(config: {
        [key: string]: any;
    }, replace?: boolean): this;
}
export {};
//# sourceMappingURL=ChartPlugin.d.ts.map