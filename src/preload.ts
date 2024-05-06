import { contextBridge, ipcRenderer } from 'electron';
import { IElectronApi } from './types/electron-api.interface';

const electronApi: IElectronApi = {
  chatGptApi: {
    getCompletion(prompt: string): Promise<string> {
      return ipcRenderer.invoke('getCompletion', prompt);
    }
  }
}

contextBridge.exposeInMainWorld('electron', electronApi);
