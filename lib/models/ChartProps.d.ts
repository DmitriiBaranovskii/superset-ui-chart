import { HandlerFunction, PlainObject } from '../types/Base';
declare type AnnotationData = PlainObject;
declare type CamelCaseDatasource = PlainObject;
declare type SnakeCaseDatasource = PlainObject;
declare type CamelCaseFormData = PlainObject;
declare type SnakeCaseFormData = PlainObject;
export declare type QueryData = PlainObject;
/** Initial values for the visualizations, currently used by only filter_box and table */
declare type InitialValues = PlainObject;
declare type ChartPropsSelector = (c: ChartPropsConfig) => ChartProps;
/** Optional field for event handlers, renderers */
declare type Hooks = {
    /** handle adding filters  */
    onAddFilter?: HandlerFunction;
    /** handle errors  */
    onError?: HandlerFunction;
    /** use the vis as control to update state */
    setControlValue?: HandlerFunction;
    /** handle tooltip */
    setTooltip?: HandlerFunction;
    [key: string]: any;
};
/**
 * Preferred format for ChartProps config
 */
export interface ChartPropsConfig {
    annotationData?: AnnotationData;
    /** Datasource metadata */
    datasource?: SnakeCaseDatasource;
    /**
     * Formerly called "filters", which was misleading because it is actually
     * initial values of the filter_box and table vis
     */
    initialValues?: InitialValues;
    /** Main configuration of the chart */
    formData?: SnakeCaseFormData;
    /** Chart height */
    height?: number;
    /** Programmatic overrides such as event handlers, renderers */
    hooks?: Hooks;
    /** Formerly called "payload" */
    queryData?: QueryData;
    /** Chart width */
    width?: number;
}
export default class ChartProps<FormDataType extends CamelCaseFormData | SnakeCaseFormData = CamelCaseFormData> {
    static createSelector: () => ChartPropsSelector;
    annotationData: AnnotationData;
    datasource: CamelCaseDatasource;
    rawDatasource: SnakeCaseDatasource;
    initialValues: InitialValues;
    formData: CamelCaseFormData;
    rawFormData: SnakeCaseFormData | CamelCaseFormData;
    height: number;
    hooks: Hooks;
    queryData: QueryData;
    width: number;
    constructor(config?: ChartPropsConfig);
}
export {};
//# sourceMappingURL=ChartProps.d.ts.map