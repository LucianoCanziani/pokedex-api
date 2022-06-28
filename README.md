https://user-images.githubusercontent.com/96893895/174805910-dd2bdc2e-4caf-46f0-8b1f-c8d5ed44cdbd.mp4

[![Netlify Status](https://api.netlify.com/api/v1/badges/efa2ef03-c249-4bba-a4a6-6bd37270497c/deploy-status)](https://app.netlify.com/sites/pokedex-luciano-canziani/deploys)

# Pokedex Api

The Famous Pokedex using the Pokemon Api.

## things I learn in this Project:

* I learn how to make calls to api with "Axios" an then how to manipulate that data.
* I learn how to use "Pagination" when I have to many item to put in one page and adjust the number of pages to them when filtered.
* I learn implement music and sound with "Howler".
* Some cool CSS effects like the search bar.

## Api Used:

Link: https://pokeapi.co/

## Required Libraries and Frameworks:

* react-lazy-load-image-component: (^1.5.4)
* axios: (^0.27.2)
* react-howler: (^5.2.0)
* react-toastify: (^9.0.4)
* react-tabs: (^5.1.0)

## GitHub 

Repository Link: https://github.com/LucianoCanziani/pokedex-api

## Deploy Netlify

Deploy Link: https://pokedex-luciano-canziani.netlify.app/

## How to Use:
1. Press the start button to enter the pokedex.
2. Browse through the Pokedex and filter the Pokemons by type and name and select your favourite pokemon to learn more about it.
3. Pokemon detail: in there you will see more information about that pokemon.

## Installation Process From Scratch (see notes below):
   *Please keep in mind that, in case that you've already have installed and configured Node.js, GitHub CLI and NPM, you should then **skip steps 1-5** and start from step number 6.*
   
1. Download and install Node.js

   **https://nodejs.org/en/download/**
   
2. Download GitHub CLI

   **https://cli.github.com/**
   
3. Install GitHub CLI. On the command line (cmd for example), run the following command:

   **winget install --id GitHub.cli**
   
4. Login to your GitHub account on GitHub CLI. On the command line, run the following command:

   **gh auth login**

5. Download the latest version of npm. On the command line, run the following command:

   **npm install -g npm**
   
6. Clone the project on your PC. On the command line, run the following command: 
   
   **gh repo clone https://github.com/LucianoCanziani/pokedex-api.git**
   
7. Install the necessary repository dependencies. On the command line, run the following command:

   **npm install**

8. Start the repository. On the command line, run the following command: 
   
   **npm start**
