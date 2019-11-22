import 'source-map-support/register';
import * as commander from 'commander';
import * as path from 'path';
import { tsasConfig } from './config/config';

const tsasCdk = new commander.Command();
tsasCdk
    .version(tsasConfig.appVersion)
    .option('-v --verbose', 'verbose logging mode');

tsasCdk.command('init', 'Init filles', {
    executableFile: path.join(__dirname, 'tsas-cdk-initialize.js'),
});
tsasCdk.command(
    'param',
    'Manage application parameters, [push-all|push-single|list]',
    { executableFile: path.join(__dirname, 'tsas-cdk-param.js') },
);

tsasCdk.command('default', 'unknown command', {
    isDefault: true,
    executableFile: path.join(__dirname, 'default.js'),
});
tsasCdk.parse(process.argv);
