import 'source-map-support/register';
import * as commander from 'commander';
import { paramPutAll } from './actions/param/param-put-all';
import * as Console from 'console';
import { LocalVariable, ParameterCommandOptions } from './actions/param/param';
import { tsasConfig } from './config/config';
import { paramList } from './actions/param/param-list';
import { paramPutSingle } from './actions/param/param-put-single';

const parseOption = (opts: {
    [key: string]: string;
}): ParameterCommandOptions => {
    return {
        env: opts.env,
        division: opts.division,
    };
};

const parseSingleParameter = (
    key: string,
    value: string,
    opts: {
        [key: string]: string;
    },
): LocalVariable => {
    return {
        key,
        value,
        secureStringFlag: Boolean(opts.secure),
    };
};

const param = new commander.Command();

// global options
param
    .version(tsasConfig.appVersion)
    .requiredOption('-e, --env <env>', 'parameter environment name')
    .option(
        '-d, --division <division>',
        'parameter division, such as "app", "e2e"',
        'app',
    );

// list
param.command('list').action(() => paramList(parseOption(param.opts())));

// put-all
param.command('put-all').action(() => paramPutAll(parseOption(param.opts())));

// put-single
param
    .command('put-single')
    .arguments('<key> <value>')
    .option('-s, --secure', 'secureString flag')
    .action((key, value, cmd) =>
        paramPutSingle(
            parseSingleParameter(key, value, cmd.opts()),
            parseOption(param.opts()),
        ),
    );

param.command('*').action(() => {
    Console.error(
        `Invalid command: ${param.args}\nSee --help for a list of available commands.`,
    ),
        param.help();
});

param.parse(process.argv);
