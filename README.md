# Zoo Management – Angular Client

A web client for a zoo: visitors can browse the zoo's animals, order entry tickets, and manage their bookings in a personal area.

Built with **Angular 21** (NgModule-based), **Reactive Forms**, **RxJS** and **HttpClient**, and designed to work with an ASP.NET Core Web API.

> **Note:** This repository contains the **client side only**. It expects the zoo's REST API at `https://localhost:7293/api/`, which is not included here, so animals and bookings will appear only when that server is running.

## Features

- **Our Animals** – a gallery of the zoo's animals with name, age, gender and description; click an animal to see a larger image
- **Ticket ordering** – a reactive form with validation (numeric ID up to 9 digits, name in Hebrew or English letters, valid email, a future visit date, and at least one ticket)
- **Automatic pricing** – the total is calculated from the number of adult and child tickets
- **Returning or new visitors** – an existing visitor is identified by ID and email; a new visitor is registered automatically before the order is saved
- **Log in / log out** – the navigation bar changes based on whether a visitor is logged in
- **Personal area** – view your bookings, edit the number of tickets (the price is recalculated), and cancel a booking

## Tech Stack

| Area | Technology |
|------|------------|
| Framework | Angular 21 (components, modules, routing) |
| Forms | Reactive Forms with built-in validators, plus template-driven forms |
| Data | HttpClient services returning RxJS Observables |
| Language | TypeScript |
| Backend (not included) | ASP.NET Core Web API |

## Architecture

```
src/app/
├── classes/        # Data models: Animals, FeedingTimes, Tickets, Visitors
├── services/       # One HttpClient service per API resource
│   ├── animal-service.ts
│   ├── feeding-times-service.ts
│   ├── tickets-service.ts
│   └── visitors-service.ts     # also keeps the logged-in visitor
├── components/
│   ├── home-page-component/
│   ├── log-in-component/
│   ├── our-animals-component/
│   ├── order-cards-component/
│   └── personal-area-component/
├── app-routing-module.ts       # /home, /login, /ourAnimals, /orderCards, /personalArea
└── app-module.ts
```

Each component talks to the API only through a service, so all HTTP calls for a resource live in one place.

## Getting Started

Requires [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Author

**Ayala Cohen** – [GitHub](https://github.com/AyalaCohenCode)
