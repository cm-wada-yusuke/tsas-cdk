import * as commander from 'commander';
import { APP_VERSION } from './config/constant';
import * as Console from 'console';
import * as path from 'path';
// import { paramPutAll } from './actions/param-put-all';
// import { paramPutSingle } from './actions/param-put-single';

const tsasCdk = new commander.Command();
tsasCdk.version(APP_VERSION);

Console.log('main');
tsasCdk
    .command(
        'param',
        'Manage application parameters, [push-all|push-single|list]',
        { executableFile: path.resolve(__dirname + '/param.js') },
    )
    .parse(process.argv);
