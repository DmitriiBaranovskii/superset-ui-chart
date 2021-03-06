import React, { ReactNode } from 'react';
import { SupersetClientInterface, RequestConfig } from '@superset-ui/connection';
import { QueryFormData, Datasource } from '@superset-ui/query';
import ChartClient, { SliceIdAndOrFormData } from '../clients/ChartClient';
import { QueryData } from '../models/ChartProps';
interface Payload {
    formData: Partial<QueryFormData>;
    queryData: QueryData;
    datasource?: Datasource;
}
export interface ProvidedProps {
    payload?: Payload;
    error?: Error;
    loading?: boolean;
}
export declare type Props = 
/** User can pass either one or both of sliceId or formData */
SliceIdAndOrFormData & {
    /** Child function called with ProvidedProps */
    children: (provided: ProvidedProps) => ReactNode;
    /** Superset client which is used to fetch data. It should already be configured and initialized. */
    client?: SupersetClientInterface;
    /** Will fetch and include datasource metadata for SliceIdAndOrFormData in the payload. */
    loadDatasource?: boolean;
    /** Callback when an error occurs. Enables wrapping the Provider in an ErrorBoundary. */
    onError?: (error: ProvidedProps['error']) => void;
    /** Callback when data is loaded. */
    onLoaded?: (payload: ProvidedProps['payload']) => void;
    /** Hook to override the formData request config. */
    formDataRequestOptions?: Partial<RequestConfig>;
    /** Hook to override the datasource request config. */
    datasourceRequestOptions?: Partial<RequestConfig>;
    /** Hook to override the queryData request config. */
    queryRequestOptions?: Partial<RequestConfig>;
};
declare type State = {
    status: 'uninitialized' | 'loading' | 'error' | 'loaded';
    payload?: ProvidedProps['payload'];
    error?: ProvidedProps['error'];
};
declare class ChartDataProvider extends React.PureComponent<Props, State> {
    readonly chartClient: ChartClient;
    state: State;
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    private extractSliceIdAndFormData;
    private handleFetchData;
    private handleReceiveData;
    private handleError;
    render(): {} | null | undefined;
}
export default ChartDataProvider;
//# sourceMappingURL=ChartDataProvider.d.ts.map