# Power 4

## Goal

The goal of this project is to create a power 4 game, where 2 players can challenge each other.

1. The first user chooses a nickname and gets the URL to share to invite other players
2. Player 2 also chooses a nickname and joins the game
3. Both players choose a game
4. The game creator starts the game
5. Players take turns placing checkers in a 7x6 grid
6. A player wins if 4 checkers are aligned vertically/horizontally or diagonally

## Technologies

- [NodeJS](https://nodejs.org/)
- [Pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [XState](https://xstate.js.org/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
    - [Reconnecting WebSocket](https://www.npmjs.com/package/reconnecting-websocket)
- [Fastify](https://www.fastify.io/)
    - [@fastify/websocket](https://www.npmjs.com/package/@fastify/websocket)

## Technological choices

### TypeScript

For this project we use the TypeScript language which will allow us to have a static
analysis of our code and a little more assurance on the proper functioning of our application. This language will
also allow us to reuse pieces of code between our backend and our frontend.

### State machine

To represent the logic of our game we use a state machine. This allows us to represent our game as a series of
finite states (waiting lobby, game phase, victory...) with transitions allowing to go from one state to another. This
approach is perfectly suited for a board game which often works with predefined stages and specific actions defined by
the rules of the game.

To create this machine we use Xstate which offers very good TypeScript support.

### React front end

For the front end we will use a library that will update the view according to the state of our game. We could use any
library here, but I chose React because it is the most popular (and will interest the most people).

NodeJS & WebSocket
To allow our 2 players to play together we are going to use a server to manage the state of our game and synchronize the
actions. We will use NodeJS technology which will allow us to share a maximum of code between our backend and our
frontend. The communication can be done through different protocols

- HTTP, allows a client -> server communication
- Server Sent Event, allows a server -> client communication
- WebSocket, allows a communication in both directions - server <-> client
- WebRTC, allows a direct communication between 2 clients

In our situation websockets are the best choice because the user must be able to send his actions to the server but also
receive updates of the state of our game.

## Planning

1. State machine
2. Interface
3. Offline game
4. Server setup
5. Online game
6. Deployment

--- 

This project is from the [Grafikart tutorial videos](https://grafikart.fr/formations/puissance-4-websocket).
