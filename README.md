## Introduction
This project is a personal project to build a web app that generates web pages in real time using open source AI models. Goal was to dive into how AI models work and how they can be used to perform actions through a user interface. Project in progress.

Currently, only the API integration with llama works, and the code is not optimised at all. (changes made just to get a response from the AI model based on UI response)



## Prerequisites

To run this project you will need llama in yout local machine, this can be done by downloading the model via [Ollama](https://github.com/ollama/ollama/tree/main)

## Getting Started

Once you have llama3.2 (model used for this example) in your local machine, clone this repository and run the following commands

NOTE: I'm using node version 18.18.0 for this project. Ideally, should work for later versions of node as well
I have added a .nvmrc file. 
```bash
nvm use
```

Then install the node dependencies, run
```bash
npm install
```
To start the app, run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Make sure the llama3.2 model instance is running in your system.

