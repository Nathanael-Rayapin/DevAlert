import { IUserConfig } from "../index";

export interface IConfigAnswers {
    selectedApis: string[];
    checkInterval: number;
    timezone: string;
}

export interface IPromptOptions {
    existingConfig?: Partial<IUserConfig>;
    skipApiSelection?: boolean;
    preSelectedApis?: string[];
}
