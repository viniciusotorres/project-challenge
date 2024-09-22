import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Serviço de notificação com snackbars.
 * @export
 * @class NotificationService
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Exibe uma notificação.
   * @param message - A mensagem a ser exibida.
   * @param action - A ação a ser exibida no botão (default é 'Fechar').
   * @param duration - Duração da notificação em milissegundos (default é 3000).
   * @param config - Configurações adicionais para o snack bar.
   */
  showNotification(message: string, action: string = 'Fechar', duration: number = 3000, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }

  /**
   * Exibe uma notificação de sucesso.
   * @param message - A mensagem de sucesso.
   */
  showSuccess(message: string): void {
    this.showNotification(message, 'Fechar', 3000, { panelClass: ['success-snackbar'] });
  }

  /**
   * Exibe uma notificação de erro.
   * @param message - A mensagem de erro.
   */
  showError(message: string): void {
    this.showNotification(message, 'Fechar', 3000, { panelClass: ['error-snackbar'] });
  }

  /**
   * Exibe uma notificação de aviso.
   * @param message - A mensagem de aviso.
   */
  showWarning(message: string): void {
    this.showNotification(message, 'Fechar', 3000, { panelClass: ['warning-snackbar'] });
  }
}
