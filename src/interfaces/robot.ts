export interface Robot {
    userId: number;
    processId: string;
    processVersion: number;
    name: string;
    createdAt: Date;
    [key: string]: any;
}