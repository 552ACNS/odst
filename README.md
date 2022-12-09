# ODST (Operational Development Software Team)

## Table of Contents

- [Group Culture](#group-culture)
- [Website Registration](#website-registration)
- [Setting up Development Environment](#setting-up-development-environment)
  - [Visual Studio Code](#visual-studio-code)
  - [Node.JS](#nodejs)
  - [Nest.JS GLOBAL](#nestjs-global)
  - [Yarn](#yarn)
  - [Git](#git)
  - [WSL 2](#wsl-2)
  - [Docker(Rancher)](#docker-rancher-desktop)
  - [Insomnia](#insomnia)
- [References](#references)
  - [Nx Console](#nx-console)
  - [Admin user account for graphql API access](#admin-user-account-for-graphql-api-access)
  - [Docker](#docker)
  - [Docker images/tags](#docker-imagestags)
  - [Common Troubleshooting tips](#common-troubleshooting-steps)

# Group Culture

Every workday there is a **_Daily Scrum_** in the team area (after the flight standup) for the developers. There we discuss roadblocks, what we did the previous work day, plans this current day and so forth.
You and your partner are expected to complete the tasks together; if research is needed, you’ll both be expected to conduct it. This ensures knowledge sharing occurs. Cell Phone use in the team area will be kept to a **minimum**. Breaks can be taken outside of the team area where members can use their phones freely.
Responsibility for how long and frequent breaks occur will be at the discretion of the member until it becomes an issue.
Members are expected to attend all Scrum Events to include: **_Backlog Grooming_**, **_Sprint Planning_**, **_Daily Stand-ups_**, **_Sprint Reviews_**, and **_Sprint Retrospectives_**.
Please plan leave, appointments, meetings, and volunteer opportunities **around** these important events.

We use [Google Calendar](https://calendar.google.com/calendar/u/0?cid=N3IwdHVoZWtqdDRhNGNjNWV2dWE3dGhhZHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ) for tracking all Scrum Events, Leave, Appointments, Squadron/Flight events, etc.

# Website Registration

You will need to register for accounts through all these sources before setting up your development environment.

### [Jira](https://id.atlassian.com/login?continue=https%3A%2F%2Fstart.atlassian.com%2F&application=start)

### [GitHub](https://github.com/)

### [DigitalU](https://digitalu.af.mil/)

# Setting up Development Environment

### Visual Studio Code

- VS Code is a text editor, but one that is extensible with diverse types of plugins. With these plugins VS Code turns into a “IDE” that combines version control, Intellisense, Live Share, formatting, and many other QoL features. We need an IDE to edit JavaScript/typescript projects. Download here, [Visual Studio Code - Code Editing. Redefined.](https://code.visualstudio.com/)

- Make sure you click on **_“Open w/ Code”_** functions in the installer

- After installing, make sure to enable execution policies if you are on windows. [about Execution Policies - PowerShell | Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1)

  - Run on an **Administrator** Powershell: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

- Be sure to add the recommended extensions to VSCode, a list can be found in the .vscode/extensions.json file in the repository

### Node.JS

- Node.JS is a JavaScript runtime environment that allows for front-end and back-end work using the JavaScript programming language. It allows us to run JavaScript on a server/desktop as opposed to just in the browser. For Windows/MAC users, download the latest version here, [Download | Node.js (nodejs.org).](https://nodejs.org/en/download/current/) Get the **“LTS”** version (**_IMPORTANT!_**)

### Nest.JS GLOBAL

- You will need to run this **after** installing node. Copy and paste this onto the command prompt. Note that MAC users/Linix machines may not be able to simply copy and paste do to different ASCII characters. Do not forget to add **“sudo”** in front of it for Mac/Linux.

  - `npm install –g @nestjs/cli`

### Yarn

- Install YARN, we are using this instead of NPM for our package manager

  - `npm install -g yarn`

### Git

- Regardless of what Git system you use (vanilla command line, vanilla git GUI, built into your IDE, a desktop client, etc) you need to download the Git tools. These can be found here, [Git - Downloads](https://git-scm.com)

- For **MAC** users, install **_Homebrew_** first w/ the instructions here, [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/)

- Ensure that you change the **CRLF** settings to: **_Checkout as-is, commit as-is_** (Dont worry about this step if using MAC)

### WSL 2

- [Install Ubuntu | Microsoft Store](https://www.microsoft.com/store/productId/9PDXGNCFSCZV)

- In PowerShell, set Ubuntu WSL to version 2

  - `wsl --set-version ubuntu 2`

- In WSL (Ubuntu), make sure to update it

  - `sudo apt update`
  - `apt list -–upgradable`
  - `sudo apt upgrade`

- Return to PowerShell and ensure WSL 2 is installed
  - `wsl -l -v`

### Docker (Rancher Desktop)

[Windows/Linux]

- You will need to install WSL 2 as part of this if you are on windows, refer to the section above. The below instructions are for Windows/Debian (Ubuntu is Debian).

[Rancher Desktop]

- Install Rancher Desktop, [Installation | Rancher Desktop Docs](https://docs.rancherdesktop.io/getting-started/installation). Launch it and wait for it to finish installing the required packages. Use the **dockerd** runtime if anything asks for it.

- Open the ODST repository in VSCode and open a Rancher WSL terminal. Ensure it's working by runnning the following command

  - `docker container run hello-world `

- Use **apt** to install the appropriate packages to be able to transfer files over http, get certificate authorities, ensure curl is installed and install a tool to communicate to your linux distro.

  - `sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release`

- Download the GPG key for Docker:

  - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`

- Install the stable version of Docker

- Go to this [Pastebin](https://pastebin.com/9nPeLGcg) and copy and paste the contents into wsl

- Install Docker Utilities:

  - `sudo apt update`
  - `sudo apt install docker-ce docker-ce-cli containerd.io`
  - `sudo apt install docker-compose`

- You will need to start Docker in WSL after every restart:

  - `sudo service docker start`

- Test that it is working:
  - `sudo docker run hello-world`

[Ironbank]

- Create an [Ironbank](https://ironbank.dso.mil/) account

- Log in to [Harbor](https://registry1.dso.mil/harbor)

- Go to **User Profile** and copy **CLI Secret**

- In WSL, run `sudo docker login registry1.dso.mil -u=YOUR_USERNAME` (Login with your username replacing YOUR_USERNAME and CLI secret for your password)

- If logging into IronBank via WSL throws an error regarding not being able to store credentials, you have to make a GPG key

  - Run `gpg --gen-key`
  - Choose option 1
  - Choose a bit size
  - Choose 0, does not expire, and then Y to confirm
  - Give name and email (used to generate user ID), then O to confirm
  - Create a passphrase
  - Find output line `gpg: key [KEY] marked as ultimately trusted`, this is your key
  - Run `pass init KEY` replacing KEY with your key

- Youhould now be able to execute:

  - `sudo docker pull registry1.dso.mil/ironbank/opensource/postgres/postgresql12`

- Navigate to the ODST repo on WSL and run

  - `sudo docker-compose up postgres -d` (This method will support docker-compose files up to version 3.7)

- Now start your image
  - `docker compose up -d`

### Insomnia

- Insomnia is a routing client we use to test our API
- [Download - Insomnia](https://insomnia.rest/download)

# References

### Nx Console

- The following are helpful links for learning how to navigate and use the Nx Console

  - [Nx Documentation](https://nx.dev/angular)

  - [10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

  - [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

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

### Start all services listed in docker-compose

`docker-compose up ods`

Add `-d` to start them in the background; can change `ods` to another service if you'd like.
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

This could be because you've made changes to the schema and didn't rerun the backend. Serving the backend and running `yarn` again will ensure the graphql schema and types will be generated properly.

### - Webpack config errors on frontend

Need to remove prisma references from frontend and only use the generated graphQL files.

### - New prisma database

When creating a new prisma database, you need to specify what project it is made for in the prisma.schema under outputs.

### - Tailwind isn't working w/ Material

Ensure that you marked Tailwind as "Important" under tailwind config.

### - No loader available on a .graphql file in frontend

Don't import from the .graphql file, import from .generated file

### - "Excessive stack depth" error on prisma/graphql types

Coerce the type to the expected prisma type. Will probably need to do it on resolver. <br/>
Example: `UserWhereInput as Prisma.UserWhereInput`
