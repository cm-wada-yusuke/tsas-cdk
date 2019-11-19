import * as commander from 'commander';
import { APP_VERSION } from './config/constant';
import { paramPutAll } from './actions/param/param-put-all';
import { paramPutSingle } from './actions/param/param-put-single';
import * as Console from 'console';

const param = new commander.Command();
param.version(APP_VERSION);

Console.log('param');

param.command('put-all').action(paramPutAll);
param
    .command('put-single')
    .action(paramPutSingle)
    .option('-s, --secureString', 'secureString flag');

param.parse(process.argv);
