import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MenusComponent } from '../menus/menus.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    CommonModule,
    MenusComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  semanas: number[][] = [];
  mesAtualFormatado: string = '';
  semanaSelecionada: number | null = null;

  ngOnInit() {
    this.gerarCalendario(new Date());
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
    // Selecionar a semana que contém o dia atual
    const hoje = new Date().getDate();
    this.semanaSelecionada = semanas.findIndex(semana => semana.includes(hoje));
  }

  selecionarSemana(indice: number) {
    console.log('Semana selecionada:', indice);
    this.semanaSelecionada = indice; // Atualiza a semana selecionada
  }
}