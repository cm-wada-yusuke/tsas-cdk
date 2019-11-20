import { LocalVariable, ParameterCommandOptions } from './param';
import { loadUserConfig } from '../../config/config';
import { list } from './param-list';
import { ssmPutParameter } from '../../infrastructures/ssm';

// 送信
const put = async (
    variable: LocalVariable,
    opts: ParameterCommandOptions,
): Promise<void> => {
    await ssmPutParameter(
        loadUserConfig().appName,
        opts.division,
        opts.env,
        variable,
    );
};

export const paramPutSingle = async (
    env: LocalVariable,
    opts: ParameterCommandOptions,
): Promise<void> => {
    await put(env, opts);
    await list(opts);
};
