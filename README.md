# TaskFlow - NgRx Task Management
Hey! This is a demo app I built to explore NgRx state management patterns in Angular 21. It's a task management app with a Kanban board and list views. I wanted to try out the different NgRx approaches (Store, Component Store, and Signals Store) all in one project to compare them and understand when to use each.

## Quick Start
You'll need Node.js 18+ and Angular CLI. Then just:
```bash
npm install
npm start
```
Navigate to `http://localhost:4200`.

## Tech Stack
Built with Angular 21, NgRx (Store, Effects, Entity, Component Store, Signals), Angular Material, TypeScript, RxJS, and SCSS. Using ngx-translate for i18n and SSR support with Express.

## How the state management works
The app showcases three different NgRx patterns:

### NgRx Store (Global State)
1. Tasks data is loaded via Effects
2. API calls trigger actions
3. Reducer updates the state
4. Selectors filter and transform data
5. Components subscribe to the store

### NgRx Component Store (Local UI State)
1. View mode (grid/list/kanban)
2. Sorting preferences
3. Task selection state
4. Component-scoped, no global pollution

### NgRx Signals Store (Reactive Notifications)
1. New notification triggers state update
2. Computed signals for filtering
3. Auto-dismiss after 5 seconds
4. Modern signal-based reactivity

## Features
- 📋 Kanban board with drag & drop
- 📝 Task list with filters
- 🏷️ Tag system
- 🔔 Toast notifications
- 🌐 i18n ready

**Cecilia Ducos**  
Frontend Developer  

Website: [ceciliaducos.com](https://ceciliaducos.com)  
Email: [ducoscecilia@gmail.com](mailto:ducoscecilia@gmail.com)  
LinkedIn: [linkedin.com/in/cecilia-ducos](https://www.linkedin.com/in/cecilia-ducos)