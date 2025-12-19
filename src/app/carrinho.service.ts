import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho, contexto: boolean) {
    const carrinho = localStorage.getItem('carrinho');
    this.itens = carrinho ? JSON.parse(carrinho) : [];
    const item = this.itens.find(item => item.id === produto.id)
    if (item && contexto == true){
      item.quantidade += produto.quantidade
    } else if(item && contexto == false){
      item.quantidade = produto.quantidade;
    } else{
      this.itens.push(produto);
    }
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  removerProdutoCarrinho(produtoId: number){
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho(){
    this.itens = [];
    localStorage.clear();
  }
}
