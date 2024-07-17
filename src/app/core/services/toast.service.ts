import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

interface IToastMessage {
  message: string,
  sticky?: boolean,
  life?: number,
  key?: string,
}

interface IToastErrorMessage extends IToastMessage {
  error?: HttpErrorResponse,
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }


  // @param  {IToastMessage} message

  showSuccess(message: IToastMessage) {
    this.messageService.add({ severity: 'success', key: message.key ? message.key : 'root-toast', detail: message.message, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
  }


  // @param  {IToastErrorMessage} message
  showError(message: IToastErrorMessage) {
    if (message.error && message.error?.message) {
      this.messageService.add({ severity: 'error', key: message.key ? message.key : 'root-toast', detail: message.error?.message, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
    } else if (message.error && message.error?.error) {
      this.messageService.add({ severity: 'error', key: message.key ? message.key : 'root-toast', detail: message.error?.error, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
    } else if (message.message) {
      this.messageService.add({ severity: 'error', key: message.key ? message.key : 'root-toast', detail: message.message, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
    } else {
      this.messageService.add({ severity: 'error', key: message.key ? message.key : 'root-toast', detail: 'Error Occured. Please contact system administrator.', sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
    }
  }


  // @param  {IToastMessage} message

  showInfo(message: IToastMessage) {
    this.messageService.add({ severity: 'info', key: message.key ? message.key : 'root-toast', detail: message.message, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
  }


  //  @param  {IToastMessage} message
  showWarning(message: IToastMessage) {
    this.messageService.add({ severity: 'warn', key: message.key ? message.key : 'root-toast', detail: message.message, sticky: message.sticky ? message.sticky : false, life: message.life ? message.life : 3000 });
  }

  clear() {
    this.messageService.clear();
  }
}
