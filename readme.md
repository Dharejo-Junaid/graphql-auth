<p align="center">
  <img src="https://github.com/Dharejo-Junaid/graphql-auth/blob/main/gql.png" alt="GraphQL Logo" width="300" />
</p>

# graphql-auth
This repo contains full authentication system implemented using graphql in backend. It seamlessly integrates user authentication features within a GraphQL API, providing a secure foundation for your web applications.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- MongoDB installed locally or a cloud-based MongoDB service

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Dharejo-Junaid/graphql-auth
```

2. Install dependencies using npm:

```bash
npm install
```

3. create a ".env" file:
- PORT=5000
- JWT_SECRET="xxxxxxxxxxx"
- MONGO_URI="mongodb://localhost:27017/auth"
- EMAIL="xxxxxxxxxx@gmail.com" (required)
- EMAIL_PASS="xxxxxxxxxxxxxxxxxxxxxxx" (required)

4. Start server on port 5000 using:

```bash
npm start
```

5. open your browser and type:
```bash
http://localhost:5000/graphql
```

## API Endpoints
### Queries:
1. login
2. users (This is protected. To access this you need to create an account and verify it);
3. user (This is protected as well. So same goes for this);

## Mutations:
1. Signup
2. Verify