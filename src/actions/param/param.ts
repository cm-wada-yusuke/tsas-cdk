export type ParameterCommandOptions = {
    stage: string;
    division: string;
};

export type LocalVariable = {
    key: string;
    value: string;
    secureStringFlag?: boolean;
};

export type StoredParameter = {
    Name: string;
    Type: string;
    Value: string;
    Version: number;
    ARN: string;
};
