export interface Properties {
    activityID: string;
    activityType: string;
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
    [key: string] : string;
}

export interface ProcessVariables {
    id: number;
    name: string;
    type: string;
    value: string;
}