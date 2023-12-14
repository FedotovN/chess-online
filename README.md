# NuxtChess
Web app to play chess with friends. 
## Demo
![2023-12-14 02-22-35](https://github.com/FedotovN/chess-online/assets/53238017/2994fc87-d34d-4032-ae34-6045b2a0534a)
## Features
- Authentication 🔐
  - Firebase powered authentication via Google provider or email
  - Authentication is needed for playing online, but soon there will be singleplayer
- Chess online gameplay ♟️
  - All chess rules, such as moves validation, check, mate, castle, en passant, pawns promotion
  - Realtime connection between users
  - Invite an opponent to play using link or game ID
- Chat 💬
  - Realtime messaging between listeners
  - Only in game for now, but made easy to scale
- User stats 📈
  - NuxtChess saves info about all of your games: how it ended and how it went
  - Each win or lose gives you scores, which may be lately use for opponent search
## Todo
- UX
  - Add sounds: for chess events or some UI interactions
  - Reorganize the design of a game section
  - Add color settings using *useColor* composable from my last [UI-kit](https://github.com/FedotovN/vue-ui-kit) project
  - Maybe add i18n (Ru/En)
  - Maybe add color themes (Dark / light)
- Chess
  - Add singleplayer: let unauthenticated users use local board
  - Form of creating new game
- Huge refactor
## Ideas
  - Social
    - Friends list and chats?
    - Invite friends directly?
    - Add emoji to chat component (use one from my [messenger](https://github.com/FedotovN/messenger-app) project)
## Tech Stack
- Nuxt3 💚
- Typescript ☄️
- TailwindCSS 🌊
- Firebase 🔥
## Related
  [Vue UI kit](https://github.com/FedotovN/vue-ui-kit)
