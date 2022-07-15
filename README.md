# Connect 4

## Goal

The goal of this project is to create a `Connect 4` game, where 2 players can challenge each other.

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
  - [reconnecting-websocket](https://www.npmjs.com/package/reconnecting-websocket)
- [Fastify](https://www.fastify.io/)
  - [@fastify/websocket](https://www.npmjs.com/package/@fastify/websocket)
- [Vite](https://vite.net/)
- [Vitest](https://vitest.dev/)

## Technological choices

### TypeScript

For this project I use the `TypeScript` language which will allow me to have a static
analysis of my code and a little more assurance on the proper functioning of my application. This language will
also allow my to reuse pieces of code between the backend and the frontend.

### State machine

To represent the logic of the game I use a state machine. This allows me to represent the game as a series of
finite states (waiting lobby, game phase, victory...) with transitions allowing to go from one state to another. This
approach is perfectly suited for a board game which often works with predefined stages and specific actions defined by
the rules of the game.

To create this machine I use `Xstate` which offers very good `TypeScript` support.

### React front end

For the front end I use a library that will update the view according to the state of the game. I could use any
library here, but I chose `React` because it is the most popular.

### NodeJS & WebSocket

To allow the 2 players to play together, I use a server to manage the state of the game and synchronize the
actions. I use `NodeJS` technology which will allow me to share a maximum of code between the backend and the
frontend. The communication can be done through different protocols

- HTTP, allows a client -> server communication
- Server Sent Event, allows a server -> client communication
- WebSocket, allows a communication in both directions - server <-> client
- WebRTC, allows a direct communication between 2 clients

In this situation `websockets` are the best choice, because the user must be able to send his actions to the server but
also receive updates of the state of the game. I could use socket.io which offers many features, but in this case I
don't need it. I just want a websockets communication, so I use the `reconnecting-websocket` package.

### Server

`Fastify`

The reason is simply because I only knew express, and I wanted to learn how to use Fastify.

For the websocket part I use the `@fastify/websocket` package.

### Bundler

`Vite`

This bundler is fast and simple to use.

### Dependency Manager

`pnpm`

I usually use npm or yarn, and I wanted to test a new dependency manager.

This package is also faster than npm.

### Tests

Of course, we need tests to make sure that the code works as expected without always having to test the whole game by
hand.

I use `Vitest` because it integrates very well with Vite.

## Planning

1. State machine
2. Interface
3. Offline game
4. Server setup
5. Online game
6. Deployment

## Documentation

### [State](./doc/state/README.md)

--- 

This project is from the [Grafikart tutorial videos](https://grafikart.fr/formations/puissance-4-websocket).
