export interface Robot {
    userId: number;
    processId: string;
    processVersion: number;
    name: string;
    createdAt: Date;
    [key: string]: any;
}

export interface Schedule {
    CreationDate: Date;
    StartDate?: Date;
    EndDate?: Date;
    LastModificationDate: Date;
    Name: string;
    ScheduleExpression: string;
    ScheduleExpressionTimezone: string;
}