import SSM, {
    GetParametersByPathRequest,
    PutParameterRequest,
} from 'aws-sdk/clients/ssm';
import * as path from 'path';
import * as fs from 'fs-extra';

export class TsasParameterManager {
    readonly appName: string;
    readonly stage: string;
    readonly division: string;
    readonly region: string;

    ssm: SSM;

    /**
     * Construct parameter manager.
     * `new TsasParameterManager()` make a aws-sdk ssm instance.
     * @param stage Environment name, such as 'dev', 'stg', 'prd'.
     * @param division Division name. Same as environment file name.
     */
    constructor(stage: string, division: string) {
        this.stage = stage;
        this.division = division;
        const configPath = path.resolve('tsas-cdk.config.json');
        const jsonString: string = fs.readFileSync(configPath, 'utf8');
        const paramJson = JSON.parse(jsonString);
        this.appName = paramJson.appName;
        this.region = paramJson.region;
        this.ssm = new SSM({
            apiVersion: '2014-11-06',
            region: this.region,
        });
    }

    /**
     * Load ssm parameter store value and return as `TsasParameters` type.
     * @param division Designated division name. default: constructor division.
     */
    async load(division: string = this.division): Promise<TsasParameters> {
        const ssmListParameters = async (): Promise<TsasParameter[]> => {
            const searchPath = `/${this.appName}/${division}/${this.stage}`;
            const parameters: GetParametersByPathRequest = {
                Path: searchPath,
                Recursive: true,
                WithDecryption: true,
            };
            let result: TsasParameter[] = [];
            do {
                const response = await this.ssm
                    .getParametersByPath(parameters)
                    .promise();
                parameters.NextToken = response.NextToken;
                if (response.Parameters) {
                    result = result.concat(
                        response.Parameters as TsasParameter[],
                    );
                }
            } while (parameters.NextToken);
            return result;
        };

        const shortName = (slashContainString: string): string => {
            return path.basename(slashContainString);
        };

        const convertKeyValueStyle = (
            params: TsasParameter[],
        ): TsasParameters => {
            return params.reduce(
                (pre, cur) => ({
                    ...pre,
                    [shortName(cur.Name)]: cur,
                }),
                {},
            );
        };

        const params = await ssmListParameters();
        return convertKeyValueStyle(params);
    }

    /**
     * Push a couple of key-value.
     *
     * @param key key string
     * @param value value string
     * @param division Designated division name. default: constructor division.
     * @param secure secureString flag.
     */
    async push(
        key: string,
        value: string,
        division: string = this.division,
        secure = false,
    ): Promise<void> {
        const putParameters: PutParameterRequest = {
            Name: `/${this.appName}/${division}/${this.stage}/${key}`,
            Value: value,
            Type: secure ? 'SecureString' : 'String',
            Overwrite: true,
        };
        await this.ssm.putParameter(putParameters).promise();
    }
}

type TsasParameter = {
    Name: string;
    Type: string;
    Version: number;
    ARN: string;
};

type TsasParameters = {
    [key: string]: TsasParameter;
};
