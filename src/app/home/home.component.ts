import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MenusComponent } from '../menus/menus.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Add this if it's a Web Component
import { ModalAgendarComponent } from '../modal-agendar/modal-agendar.component'; // Adjust the path if necessary

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    CommonModule,
    MenusComponent,
    ModalAgendarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // If 'app-modal-agendar' is a Web Component, include the following:
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // If 'app-modal-agendar' is an Angular component, ensure its module is imported in the parent module.
})
export class HomeComponent {
  modalAberto: boolean = false;
  
  semanas: number[][] = [];
  mesAtualFormatado: string = '';
  semanaSelecionada: number | null = null;
  dataAtual: Date = new Date();

  ngOnInit() {
    this.gerarCalendario(this.dataAtual);
  }

  gerarCalendario(data: Date) {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();

    // Formatar o nome do mês
    this.mesAtualFormatado = primeiroDia.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    this.mesAtualFormatado = this.mesAtualFormatado.charAt(0).toUpperCase() + this.mesAtualFormatado.slice(1);

    // Gerar os dias do mês
    const dias: number[] = [];
    for (let i = 1; i <= diasNoMes; i++) {
      dias.push(i);
    }

    // Dividir os dias em semanas
    const semanas: number[][] = [];
    let semana: number[] = [];

    // Preencher os dias vazios antes do primeiro dia do mês
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      semana.push(0); // 0 representa um dia vazio
    }

    dias.forEach((dia) => {
      semana.push(dia);
      if (semana.length === 7) {
        semanas.push(semana);
        semana = [];
      }
    });

    // Preencher os dias vazios após o último dia do mês
    while (semana.length < 7) {
      semana.push(0);
    }
    if (semana.length > 0) {
      semanas.push(semana);
    }

    this.semanas = semanas;

    // Selecionar a semana
    const hoje = new Date();
    if (data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear()) {
      // Se for o mês atual, selecione a semana que contém o dia atual
      this.semanaSelecionada = semanas.findIndex(semana => semana.includes(hoje.getDate()));
    } else {
      // Caso contrário, selecione a primeira semana
      this.semanaSelecionada = 0;
    }
  }

  selecionarSemana(indice: number) {
    console.log('Semana selecionada:', indice);
    this.semanaSelecionada = indice; // Atualiza a semana selecionada
  }

  voltarMes() {
    this.dataAtual.setMonth(this.dataAtual.getMonth() - 1); // Subtrair um mês da data atual
    this.gerarCalendario(this.dataAtual); // Gerar o calendário para o mês anterior
  }

  avancarMes(){
    this.dataAtual.setMonth(this.dataAtual.getMonth() + 1); // Adicionar um mês à data atual
    this.gerarCalendario(this.dataAtual); // Gerar o calendário para o próximo mês
  }

  abrirModal() {
    const modal = document.querySelector('app-modal-agendar') as HTMLElement;
    if (modal) {
      modal.style.display = 'block'; // Exibe o modal
      this.modalAberto = true; // Atualiza o estado do modal
    }
  }

  fecharModal() {
    const modal = document.querySelector('app-modal-agendar') as HTMLElement;
    if (modal) {
      modal.style.display = 'none'; // Oculta o modal
      this.modalAberto = false; // Atualiza o estado do modal
    }
  }
}