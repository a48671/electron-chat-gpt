export interface IElectronApi {
  chatGptApi: {
    getCompletion(prompt: string): void;
  };
}
