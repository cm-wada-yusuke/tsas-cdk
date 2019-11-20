import 'source-map-support/register';
import * as commander from 'commander';
import { tsasConfig } from './config/config';
import { init } from './actions/init/init';

const tsasInit = new commander.Command();

tsasInit.version(tsasConfig.appVersion).action(init);

tsasInit.parse(process.argv);
