export interface Properties {
    activityID: string;
    activityType: string;
    properties: Arguments;
}

export class Arguments {
    [key: string] : string;
}