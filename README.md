# < Duopass >
<fig>
<img src="https://github.com/jardelima/duopass/blob/main/src/assets/images/banner.png" alt="Banner do projeto">
<figcaption>Banner do Projeto</figcaption>
</fig>

## Inicialização
Para executar o projeto, utilize as ferramentas descritas na sessão *Ferramentas*.

*OBS: A API do projeto é confidêncial, caso queira executar o projeto em sua máquina, algumas funcionalidades não funcionarão.*

## Ferramentas
* [VS Code](https://code.visualstudio.com/) (Ou algum Editor de código de sua preferência)
* [Node](https://nodejs.org/en) - (Versão >= v18.12)
* [JDK](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) - (Versão 9)
* [Android Studio](https://developer.android.com/studio)
* [React Native](https://reactnative.dev/) - (Versão >= 0.73.2)

# < Conecta Inn >

## Introdução

Esse projeto foi desenvolvido para facilitar a compra de descontos disponibilizados pelas empresas parceiras da assinatura Duopass. O aplicativo também disponibilizará todas as informações que o cliente queira saber, por exemplo: Dias e horário de funcionamento, regras de uso, avaliações de outros clientes, etc.

## Análise técnica

### Descrição do ambiente técnico

O sistema é composto por um banco de dados e uma interface mobile. Funcionalidades principais:

* **F1** - Assinatura Duopass.
* **F2** - Compra de cupons de descontos.
* **F3** - Extrato de cupons utilizados.
* **F4** - Ver informações sobre os descontos.


A ferramenta utilizada para o desenvolvimento front-end foi **React Native**.

### Levantamento de requisitos  
* **Processo de Assinatura**
- Login
- Assinar Duopass
- Comprar descontos

### Requisitos Funcionais
Respeitando a proposta, o sistema deverá atender os seguintes requisitos:

* **RF1** - O usuário deve poder assinar o Duopass.
* **RF2** - O usuário deve poder comprar descontos de parceiros.
* **RF3** - O usuário deve poder verificar informações sobre os descontos.
* **RF4** - O usuário deve poder ver o seu extrato de cupons utilizados.

## Regras de Negócio

_Solicitação_  

**RGN1** -  O cliente só fará o assinatura e compras se estiver cadastrado e logado.

## Casos de Uso

**UC1** - *Login no sistema*
- Ao entrar no sistema pela primeira vez o usuário deve cadastrar suas informações.

**UC2** - *Compra de cupons*
- Para comprar cupons disponibilizados por parceiros o usuário deve estar logado e com a assinatura ativa.

### Mensagens internas

Rotas utilizadas pelo para executar metodos de **POST** e **GET** no banco de dados.

##### USUÁRIO
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /profile|Informa todos dados do usuário.|
|```POST``` /profile/update|Atualiza os dados do usuário.|
|```POST``` /register|Cadastra um novo usuário.|
|```POST``` /profile/cancel-account|Deleta a conta do usuário.|
|```POST``` /forgot-password/reset|Reseta a senha do usuário.|
|```POST``` /forgot-password|Recupera a senha do usuário.|

#### DESCONTOS
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /coupons/featured?state=|Retorna os descontos destacados disponíveis.|
|```GET``` /coupons?state=|Retorna os descontos disponíveis.|
|```GET``` /hotel/{```ID DO HOTEL```}/products|Informa quais produtos o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/products/fridge|Informa quais produtos do frigobar o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/products/pool|Informa quais produtos da piscina o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/services|Informa quais serviços o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/tours|Informa quais passeios o hotel disponibiliza para compra.|

#### ASSINATURAS
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /passes|Retorna as assinaturas disponíveis.|
|```POST``` /payments/generate-pass|Gera a assinatura ou cortesia do usuário.|
|```POST``` /payments/check-discount|Checa o desconto do usuário.|
|```GET``` /payments/intent|Gera o intent para o Stripe.|


#### CUPOM
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /coupons/{```ID DO CUPOM```}|Retorna o desconto.|
|```POST``` /coupons/{```ID DO CUPOM```}/active|Ativa o desconto do usuário.|
|```POST``` /coupons/{```ID DO CUPOM```}/ratings/store|Faz uma avaliação.|


## Autor :grin:
<b>Jardel Lima Batista</b> 

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jardel-lima-040b30164/)](https://www.linkedin.com/in/jardel-lima-040b30164/) 
[![Email Badge](https://img.shields.io/badge/-Email-red?style=flat-square&logo=Gmail&logoColor=white&link=https://www.gmail.com)](mailto:dev.jardelima@gmail.com)
