# 🫧 EquiSense
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?color=blue)](./LICENSE)

### Introduction
Due to AI's ability to learn from data and readjust itself, there is a risk of unintended consequences, 
like ethical risks, biases (stereotyping, prejudice or favoritism) and unexplainable outcomes.
This project provides a GUI to assess these risks. By analyzing responses of different GenAI models and judge them on different criteria,
machine learning engineers and data scientists can identify, quantify, and mitigate biases, ensuring that the models align with ethical standards and produce more equitable and transparent outcomes.

To achieve this goal, several GenAI APIs have been integrated to address the following three use cases:
1. Prompt Generation: Generate prompts based on a user-selected topic.
2. Response Generation: Produce responses from the integrated GenAI models.
3. Response Evaluation: Assess the generated responses using criteria such as bias, ... .

#### Features
✏️ Customizable Prompts - The prompts used for the prompt generation and the response evaluation/rating can be customized. \
🌐 Multilanguage support - By customizing the prompts and translate them to an other language, prompts, responses and ratings will be generated in this custom language. \
📋 Excel Export and Import - To save the generated data, it can be exported into an .xlsx file, which can be imported in another session to continue the user's journey. \
🔍 Personalized Criteria - The user can define their own criteria for rating GenAIs responses.

### Tutorial
To execute any request to a GenAI API, you must provide a valid API key for the selected service. 
This can be done using the `🔑 Keys` button in the toolbar.

If an API key is missing or invalid, an alert will appear when attempting to perform any GenAI operation, 
and any invalid key will be automatically removed.

Once a valid key is entered, you can initiate GenAI operations by clicking the `➕ Prompts` button in the toolbar, 
or by using the `🫧 Generate responses` and `⭐ Rate responses` buttons within the expansion panels of the topics.

### APIs & Models
The following APIs and models are currently supported:

API | Model 
--- |-------
Gemini | `gemini-1.0-pro`, `gemini-1.5-pro`, `gemini-1.5-flash`
OpenAI | `gpt-3.5-turbo`, `gpt-3.5-turbo-0125`, `gpt-3.5-turbo-1106`, `gpt-3.5-turbo-16k`, `gpt-4o-mini`



### Local set up
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4and is deployed as a <a href='https://stephaniehhnbrg.github.io/EquiSense/' target='_blank'>Github Page</a>.
But in case you would like to run the project locally, follow these steps:

- Install dependencies: `npm install`
- Start project: `npm run start`
