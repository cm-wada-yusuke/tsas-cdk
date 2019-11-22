import { LocalVariable, StoredParameter } from '../actions/param/param';
export declare const ssmPutParameter: (appName: string, division: string, env: string, variable: LocalVariable) => Promise<void>;
export declare const ssmListParameters: (appName: string, division: string, env: string) => Promise<StoredParameter[]>;
