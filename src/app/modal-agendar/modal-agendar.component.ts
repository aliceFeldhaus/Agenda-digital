import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-agendar',
  standalone: true,
  imports: [],
  templateUrl: './modal-agendar.component.html',
  styleUrls: ['./modal-agendar.component.scss']
})
export class ModalAgendarComponent {
  modalAberto: boolean = false;
  mensagemSucesso: string = 'Agendamento realizado sucesso!';

  abrirModal() {
    const modal = document.querySelector('app-modal-agendar') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
      this.modalAberto = true;
    }
  }

  fecharModal() {
    const modal = document.querySelector('app-modal-agendar') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
      this.modalAberto = false;
    }
  }

  //adicionar logica para salvar
  salvarDados() {
    console.log('Dados salvos com sucesso!');

    this.fecharModal();
  }
}
