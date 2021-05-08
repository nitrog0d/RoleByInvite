# RoleByInvite

A Bot that gives members roles based on the invite they joined, requested by [Majowww](https://www.twitch.tv/majowww).

## Requeriments
* [Node.JS](https://nodejs.org/en/download/) (LTS version)

## Installation
* Clone the repository with `git clone https://github.com/nitrog0d/RoleByInvite.git`
* Open the folder the repository is with `cd RoleByInvite`
* Install the dependencies using `npm install`
* Make a copy of the files `.env.example` and `config.json.example` and remove the `.example` extension
* Go to [Discord's Developer panel](https://discord.com/developers/applications), create a new Bot and make sure to enable the `Server Members Intent` setting.
* Put the Bot token on the .env file
* Change the config.json file with your own settings (Logs channel setting can be empty)

## Running
* Run the Bot by using `npm run dev`
