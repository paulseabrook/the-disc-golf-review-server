# THE disc golf review

THE disc golf review is an application that allows disc golfers to come together to add their favorite discs and check stats and information on others. They can leave comments and ratings based on their experience with a particular disc.

---

## Tehnologies Used

- Javascript
- CSS
- HTML
- Bootstrap
- Express
- Node
- MongoDB
- Mongoose
- Cors
- Bcrypt
- Passport
- Passport-JWT

---

## Entity Relationship Diagram

![ERD](./assets/erd.png)

---

## Routes Table

| NAME   | PATH       | HTTP VERB | PURPOSE                                                           |
| ------ | ---------- | --------- | ----------------------------------------------------------------- |
| Index  | /discs     | GET       | Displays all discs                                                |
| Show   | /discs/:id | GET       | Shows one specified disc                                          |
| Create | /discs     | POST      | Creates a new disc                                                |
| Update | /discs/:id | PATCH     | Updates a specified disc                                          |
| Delete | /discs/:id | DELETE    | Deletes a specified disc                                          |
| Create | /reviews   | POST      | Creates a new review                                              |
| SignUp | /sign-up   | POST      | Creates a new user                                                |
| SignIn | /sign-in   | POST      | Give an established user a token, giving them access to resources |
