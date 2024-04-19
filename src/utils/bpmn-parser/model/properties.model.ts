export interface Properties {
    activityID: string;
    activityType: string;
    keyword?: string,
    properties: PropertiesDetails;
}

interface PropertiesDetails {
    activityPackage?: string,
    serviceName?: string,
    activityName?: string,
    arguments: Arguments,
    assigns: string[],
    [key: string] : any;
}

export interface Arguments {
    [key: string] : AgumentProperties;
}

interface AgumentProperties {
    type: string;
    description: string;
    keywordArg?: string;
    value?: string;
}

export interface ProcessVariables {
    id: number;
    name: string;
    type: string;
    value: string;
}