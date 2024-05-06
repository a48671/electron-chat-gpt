interface ICompletionResponse {
  message: string;
  error?: string;
}

interface IElectronApi {
  chatGptApi: {
    getCompletion(prompt: string): Promise<ICompletionResponse>;
  };
}

declare const electron: IElectronApi;
