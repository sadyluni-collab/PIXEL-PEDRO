# Pixel — desenho em pixels

Aplicativo simples de pixel art feito com Expo, React Native e TypeScript.

## Recursos
- Paleta com 12 cores
- Grade de desenho 8 × 8
- Seleção de cor e pintura dos pixels
- Botão Limpar
- Exportação do desenho como PNG (no navegador, baixa o arquivo; no celular, abre o compartilhamento quando disponível)

## Como executar no computador

1. Instale a versão LTS do Node.js: https://nodejs.org/
2. Extraia o ZIP e abra a pasta `pixel` no VS Code.
3. Abra o terminal nessa pasta e execute:

   ```bash
   npm install
   ```

4. Inicie o app no navegador:

   ```bash
   npx expo start --web
   ```

5. O Expo mostrará o endereço local no terminal; abra-o no navegador.

## Como executar no celular

Depois de instalar as dependências, execute:

```bash
npx expo start
```

Escaneie o QR code com o Expo Go. Para compartilhar como imagem, teste no celular ou em um emulador.

## Observações
- A primeira instalação precisa de conexão com a internet para baixar as dependências.
- Se o Expo indicar incompatibilidade de versões, execute `npx expo install --fix` e siga a versão recomendada pelo próprio Expo.
