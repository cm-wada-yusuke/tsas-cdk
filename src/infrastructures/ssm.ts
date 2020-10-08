import SSM, {
    GetParametersByPathRequest,
    PutParameterRequest,
} from 'aws-sdk/clients/ssm';
import { loadUserConfig } from '../config/config';
import { LocalVariable, StoredParameter } from '../actions/param/param';

const ssm = new SSM({
    apiVersion: '2014-11-06',
    region: loadUserConfig().region,
});

// put
export const ssmPutParameter = async (
    appName: string,
    division: string,
    stage: string,
    variable: LocalVariable,
): Promise<void> => {
    const putParameters: PutParameterRequest = {
        Name: `/${appName}/${division}/${stage}/${variable.key}`,
        Value: variable.value,
        Type: variable.secureStringFlag ? 'SecureString' : 'String',
        Overwrite: true,
    };
    await ssm.putParameter(putParameters).promise();
};

// list
export const ssmListParameters = async (
    appName: string,
    division: string,
    stage: string,
): Promise<StoredParameter[]> => {
    const searchPath = `/${appName}/${division}/${stage}`;
    const parameters: GetParametersByPathRequest = {
        Path: searchPath,
        Recursive: true,
        WithDecryption: true,
        MaxResults: 2,
    };
    let result: StoredParameter[] = [];
    do {
        const response = await ssm.getParametersByPath(parameters).promise();
        parameters.NextToken = response.NextToken;
        if (response.Parameters) {
            result = result.concat(response.Parameters as StoredParameter[]);
        }
    } while (parameters.NextToken);
    return result;
};
