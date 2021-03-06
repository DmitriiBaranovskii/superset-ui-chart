import * as React from 'react';
import ChartProps from '../models/ChartProps';
import { PreTransformProps, TransformProps, PostTransformProps } from '../types/TransformFunction';
import { HandlerFunction } from '../types/Base';
export declare type Props = {
    id?: string;
    className?: string;
    chartProps?: ChartProps | null;
    chartType: string;
    preTransformProps?: PreTransformProps;
    overrideTransformProps?: TransformProps;
    postTransformProps?: PostTransformProps;
    onRenderSuccess?: HandlerFunction;
    onRenderFailure?: HandlerFunction;
};
export default class SuperChartCore extends React.PureComponent<Props, {}> {
    /**
     * The HTML element that wraps all chart content
     */
    container?: HTMLElement | null;
    /**
     * memoized function so it will not recompute
     * and return previous value
     * unless one of
     * - preTransformProps
     * - transformProps
     * - postTransformProps
     * - chartProps
     * is changed.
     */
    processChartProps: import("reselect").OutputSelector<{
        chartProps: ChartProps<import("../types/Base").PlainObject>;
        preTransformProps?: ((x: ChartProps<import("../types/Base").PlainObject>) => ChartProps<import("../types/Base").PlainObject>) | undefined;
        transformProps?: ((x: ChartProps<import("../types/Base").PlainObject>) => import("../types/TransformFunction").PlainProps) | undefined;
        postTransformProps?: ((x: import("../types/TransformFunction").PlainProps) => import("../types/TransformFunction").PlainProps) | undefined;
    }, import("../types/TransformFunction").PlainProps, (res1: ChartProps<import("../types/Base").PlainObject>, res2: ((x: ChartProps<import("../types/Base").PlainObject>) => ChartProps<import("../types/Base").PlainObject>) | undefined, res3: ((x: ChartProps<import("../types/Base").PlainObject>) => import("../types/TransformFunction").PlainProps) | undefined, res4: ((x: import("../types/TransformFunction").PlainProps) => import("../types/TransformFunction").PlainProps) | undefined) => import("../types/TransformFunction").PlainProps>;
    /**
     * memoized function so it will not recompute
     * and return previous value
     * unless one of
     * - chartType
     * - overrideTransformProps
     * is changed.
     */
    private createLoadableRenderer;
    static defaultProps: {
        id: string;
        className: string;
        preTransformProps: (x: any) => any;
        overrideTransformProps: undefined;
        postTransformProps: (x: any) => any;
        onRenderSuccess(): void;
        onRenderFailure(): void;
    };
    private renderChart;
    private renderLoading;
    private setRef;
    render(): JSX.Element | null;
}
//# sourceMappingURL=SuperChartCore.d.ts.map