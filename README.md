# Sistema criação de posts baseado em eventos

Um sistema simples criado na intenção de demonstrar os conhecimentos adquiridos com os estudos da 
[documentação oficial do mongoose](https://mongoosejs.com/docs/) o sistema consiste em criar uma pessoa e essa pessoa
pode criar posts, assim que esses posts são criados 2 eventos são emitidos:

1. **SignedUpEvent**: Significa que a pessoa fez login a sua conta
2. **PostCreatedEvent**: Significa que a pessoa criou um novo post, aqui armazenamos o id do post e o id da pessoa que o criou

## Como rodar?

É necessario definir as variaveis de ambiente `MONGO_USER` e `MONGO_PASSWORD`, confome demostrando no arquivo `.env.example` 
dentro de um arquivo `.env`, apos isso execute o comando `npm i` e por fim execute a aplicação `node app.js`