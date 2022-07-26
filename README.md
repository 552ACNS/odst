# ODST (Operational Development Software Team)

## Table of Contents
- [Group Culture](#group-culture)
- [Website Registration](#website-registration)
- [Setting up Development Environment](#setting-up-development-environment)
   * [Node.JS](#nodejs)
   * [Nest.JS GLOBAL](#nestjs-global)
   * [Yarn](#yarn)
   * [Git](#git)
   * [Visual Studio Code](#visual-studio-code)
   * [WSL 2](#wsl-2)
   * [Docker(Rancher)](#docker-rancher-desktop)
   * [Insomnia](#insomnia)
- [References](#references)
   * [Nx](#nx)
   * [Adding capabilities to your workspace](#adding-capabilities-to-your-workspace)
   * [Generate an application](#generate-an-application)
   * [Generate a library](#generate-a-library)
   * [Development server](#development-server)
   * [Code scaffolding](#code-scaffolding)
   * [Build](#build)
   * [Running Unit Tests](#running-unit-tests)
   * [Understanding your workspace](#understand-your-workspace)
   * [Further help](#further-help)
   * [Admin user account for graphql API access](#admin-user-account-for-graphql-api-access)
   * [Docker](#docker)
   * [Docker images/tags](#docker-imagestags)
   * [Common Troubleshooting tips](#common-troubleshooting-steps)



# Group Culture
Every workday there is a ***Daily Scrum*** in the team area (after the flight standup) for the developers. There we discuss roadblocks/what we did the previous work day/plans this current day and so forth. 
Your partner and you are expected to complete the tasks together, if research is needed, you’ll both be expected to conduct it. This ensures knowledge sharing occurs. Cell Phone use in the team area will be kept to a **minimum**. Breaks can be taken outside of the team area where members can use their phones freely. 
Responsibility for how long and frequent breaks occur will be at the discretion of the member until it becomes an issue. 
Members are expected to attend all Scrum Events to include: ***Backlog Grooming***, ***Sprint Planning***, ***Daily Stand-ups***, ***Sprint Reviews***, and ***Sprint Retrospectives***. 
Please plan leave, appointments, meetings, and volunteer opportunities **around** these important events. 

We use [Google Calendar](https://calendar.google.com/calendar/u/0?cid=N3IwdHVoZWtqdDRhNGNjNWV2dWE3dGhhZHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ) for tracking all Scrum Events, Leave, Appointments, Squadron/Flight events, etc.

# Website Registration
You will need to register for accounts through all these sources before setting up your development environment.

### [Jira](https://id.atlassian.com/login?continue=https%3A%2F%2Fstart.atlassian.com%2F&application=start)
### [GitHub](https://github.com/)
### [DigitalU](https://digitalu.af.mil/)

# Setting up Development Environment
### Node.JS
- Node.JS is a JavaScript runtime environment that allows for front-end and back-end work using the JavaScript programming language. It allows us to run JavaScript on a server/desktop as opposed to just in the browser. For Windows/MAC users, download the latest version here, [Download | Node.js (nodejs.org).](https://nodejs.org/en/download/current/) Get the **“LTS”** version (***IMPORTANT!***) 

### Nest.JS GLOBAL
- You will need to run this **after** installing node. Copy and paste this onto the command prompt. Note that MAC users/Linix machines may not be able to simply copy and paste do to different ASCII characters. Do not forget to add **“sudo”** in front of it for Mac/Linux. 

- `npm install –g @nestjs/cli`

### Yarn
- Install YARN, we are using this instead of NPM for our package manager

- `npm install -g yarn`

### Git
- Regardless of what Git system you use (vanilla command line, vanilla git GUI, built into your IDE, a desktop client, etc) you need to download the Git tools. These can be found here, [Git - Downloads](git-scm.com) 

- For **MAC** users, install ***Homebrew*** first w/ the instructions here, [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/) 

- Ensure that you change the **CRLF** settings to: ***Checkout as-is, commit as-is*** (Dont worry about this step if using MAC)

### Visual Studio Code
- VS Code is a text editor, but one that is extensible with diverse types of plugins. With these plugins VS Code turns into a “IDE” that combines version control, Intellisense, Live Share, formatting, and many other QoL features. We need an IDE to edit JavaScript/typescript projects. Download here, [Visual Studio Code - Code Editing. Redefined.](https://code.visualstudio.com/)

- Make sure you click on ***“Open w/ Code”*** functions in the installer

- After installing, make sure to enable execution policies if you are on windows. [about Execution Policies - PowerShell | Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1)
   * Run on an **Administrator** Powershell: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

### WSL 2
- [Install WSL | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install)

- Update WSL:
   * `sudo apt update`
   * `apt list -–upgradable`
   * `sudo apt upgrade`

- Ensure WSL 2 is Installed:
   * `wsl –l –v`

### Docker (Rancher Desktop)
[Windows/Linux]

- You will need to install WSL 2 as part of this if you are on windows, refer to the section above. The below instructions are for Windows/Debian (Ubuntu is Debian). 

- If you have already installed Docker Desktop on your windows distro, uninstall it. Update the apt-get tool: `sudo apt update`

[Rancher Desktop]
- Install Rancher Desktop, [Installation | Rancher Desktop Docs](https://docs.rancherdesktop.io/getting-started/installation). Launch it and wait for it to finish installing the required packages. Use the **Containderd** runtime if anything asks for it. 

- Now, every time you would use a docker command, use `nerdctl`. For example, `docker compose up` is now `nerdctl compose up`. Use the below command to see if it works. In windows, make sure you are in the rancher terminal of wsl.
   * `nerdctl container run hello-world `

- If you are on ODST, navigate to the git repo. You’ll need to login with registry1. In the terminal type:
   * `nerdctl login registry1.dso.mil -u=Your_Username` (**Replace "Your_Username"**)
   * Enter your password (should be **CLI Secret**)
   * Run `nerdctl compose up –d` to start your image: 
  
- Use **apt-get** to install the appropriate packages to transfer files over http/certificate authorities/ensure curl is installed/install a tool to communicate your linux distro.
   * `sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release`

- Download the GPG key for Docker:
   * `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`

- Install the stable version of Docker

- Go to this [Pastebin](https://pastebin.com/9nPeLGcg) and copy and paste the contents into wsl

- Install Docker Utilities:
   * `sudo apt update`
   * `sudo apt install docker-ce docker-ce-cli containerd.io`
   * `sudo apt install docker-compose`

- You will need to start Docker in WSL after every restart:
   * `sudo service docker start`

- Test that it is working:
   * `sudo docker run hello-world`

- Navigate to the ODST repo on WSL and run
   * `sudo docker-compose up postgres -d` (This method will support docker-compose files up to version 3.7)

[Ironbank]

- Create an [Ironbank](https://ironbank.dso.mil/) account

- Log in to [Harbor](https://registry1.dso.mil/harbor)

- Go to **User Profile** and copy **CLI Secret**

- In WSL, run `sudo docker login registry1.dso.mil` (Login with Username and CLI secret)

- Should now be able to execute `sudo docker pull registry1.dso.mil/ <insert stuff here>`

### Insomnia

- Insomnia is the routing client to test our API
- [Download - Insomnia](https://insomnia.rest/download)
  
  

# References
### Nx
[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@odst/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Admin user account for graphql API access

password: `admin`<br/>
username: `admin`

## Docker

### Build image locally

`docker build . --file ./apps/{app}/Dockerfile`

### Build & push via nx

`nx docker {app}`

Careful with this, due to that it pushes it up with the `:latest` tag. Add `--push=false` to not push built images up to registry.

### Migrate database via docker

`docker-compose up ods-migrate`

### start all services listed in docker-compose

`docker-compose up ods`

add `-d` to start them in the background; can change `ods` to another service if you'd like.
`ods` is dependent on `ods-api`, which is in turn dependent on `postgres`, so just specifying `ods` will start entire stack.
If you only say `docker-compose up`, all services will be started, including `ods-migrate`.

### Start to finish full docker stack

```bash
#migration
docker compose up ods-migrate

#ods stack
docker-compose up ods -d
```

## Docker images/tags

ods: `ods:latest`, `ods:v0`
ods-api: `ods-api:latest`, `ods-api:v0`
ods-migrate: `ods-api:migrate`, `ods-api:v0-migrate`

## Common Troubleshooting steps

### - `yarn` throws graphql error

This could be because you've made changes to the schema and not rerun the backend. Serving the backend, running `yarn` again will ensure graphql schema and types will be generated properly.

### - Webpack config errors on frontend

Need to remove prisma references from frontend and only use the generated graphQL files.

### - New prisma database

When creating a new prisma database, you need to specify what project it is made for in the prisma.schema under outputs.

### - Tailwind isn't working w/ Material

Ensure that you marked Tailwind as "Important" under tailwind config.

### - No loader available on a .graphql file in frontend

Don't import from the .graphql file, import from .generated file

### - "excesive stack depth" error on prisma/graphql types

coercion the type to the expected prisma type. Will probably need to do it on resolver.
example: `UserWhereInput as Prisma.UserWhereInput`
