# Backend-Project-2024 - Learn words!

## Overview
Backend-Project-2024 is a project developed as part of the 4A00EZ62-3010 Backend Development course. The assignment was to implement an application that can be used to help children learn foreign language grammar. The end user is prompted with foreign language words and must write the correct Finnish translation, or vice versa. The project is designed to manage and manipulate a database of words in different languages. It provides an API for adding, updating, deleting, and retrieving words, as well as a frontend interface for users to interact with the data.

## Motivation
The motivation behind this project is to learn more about making applications, making and managing databases, and learning more about JavaScript and React. It is also a part of the 4A00EZ62-3010 Backend Development course.

## Features
- Interactive learning interface
- Admin interface for managing words
- Add, update, delete, and retrieve words in different languages
- Filter words by tags

## Screenshots
![Screenshot of the main page of Learn words! app](screenshots/learnPage.png?raw=true)
![Screenshot of the admin view where user can manage the words](screenshots/adminPage.pngraw=true)

## Tech/Framework Used
Built with:
- Node.js
- Express.js
- SQLite
- React

## How to use?
There is two ways to use this application. The first one is by using on internet. The application is hosted on Render.com website. The second way is to clone this repository and start own development server on your computer.

### Hosted by Render
Link to the application: https://backend-project-2024-19a6.onrender.com/

### Installation
1. Clone the repository:
  - git clone https://github.com/LauriLuoma/Backend-Project-2024.git

2. Navigate to the project directory:
  - cd Backend-Project-2024

3. Install dependencies:
  - npm install

4. Start the development server:
  - npm run start

5. Open your browser and navigate to http://localhost:3000

## Known Bugs and Problems
The application has a few limitations:
  - Adding new languages to the application is not straightforward due to the current database structure. Each word entry in the database must be updated to include the new language.
    - For example, the current structure of a word in the database is `{id: 1, english: 'dog', finnish: 'koira', swedish: 'hund'}`. To add a new language, you would need to modify every word entry to include the new language property.
  - Refreshing the page will reset the user's score to 0.
  - The admin view lacks authentication, allowing anyone to access and edit the words.

## Links
Screencast:
Render.com link: https://backend-project-2024-19a6.onrender.com/
Repository link: https://github.com/LauriLuoma/Backend-Project-2024

## License
MIT © Lauri Luoma