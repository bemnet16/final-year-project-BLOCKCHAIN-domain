## Simple Overview of MetaMask Integration in Our Social Media

### 🔹 Key Areas:

1. **STAR Token Creation** - How our ERC-20 token exists and is used.
2. **MetaMask Integration** - Connecting users' wallets to our platform.
3. **User Flow** - How users buy and send tokenized gifts.
4. **DApp & MetaMask Interaction** - Understanding where transactions occur.

### 1️⃣ STAR Token Creation

- Our DApp will use an ERC-20 token (STAR) for user interactions.
- These tokens are created via a smart contract deployed on Polygon.
- Users will acquire STAR tokens and use them for gifting within the platform.

### 2️⃣ How MetaMask Is Integrated

- MetaMask will serve as the primary wallet for users.
- Since MetaMask does not natively support **flutter** mobile, WalletConnect or web3dart will be used for integration. some resources I found: [1](https://medium.com/@dbuglabs/integrating-metamask-with-flutter-a-comprehensive-guide-585cfa809a98#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYzUzNGZhNWI4Y2FjYTIwMWNhOGQwZmY5NmI1NGM1NjIyMTBkMWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDczNjA0NjUwNjcyMDYwMTM5NDkiLCJlbWFpbCI6ImJlbW5ldGFkdWduYXdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczOTA0NzYwMiwibmFtZSI6IkJlbW5ldCBBZHVnbmF3IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lhaWF4LTloMjAxWE53b2xEWE1CSXdtZDZlS3QyOFZWeE9DWGM5VXl2OHRweTltZz1zOTYtYyIsImdpdmVuX25hbWUiOiJCZW1uZXQiLCJmYW1pbHlfbmFtZSI6IkFkdWduYXciLCJpYXQiOjE3MzkwNDc5MDIsImV4cCI6MTczOTA1MTUwMiwianRpIjoiNGYzMDY3NTE4NTQzZTI4YzcwNzcwMzIxZmMxN2U4ZTMwNWZlOTEzNiJ9.SK2gUZhw1M2C-jALUKBLbS7HbI-gJ_te3VOjeuzRwXzQ9gROC3E_PugBSe5PpGiNaoTiaLqroYWNNVC2Bx-m4vEIHF94-diiCmXdogY101d-5yB8URc8ePYbfGvIQ09nBYymnXxaqKMz0HeqNqhN2EgNohrOrUvOionNc57elhsuC_sQzmPH_MloBdqmmrxglio5ceM96D2C_Qp5dLBqR52od63udFAIHNsFmQXW4Xo9FmExxI9_QdGp7uTFtKfkTgIZ26vsxJ80sxdSMdYQSgnI-wzqmwlfZnRxLmPfPnyjOen2zFmr9jxHjC1LjKM-iJLly-dZ5o17MBj6Nu8GfA), [2](https://dev.to/bhaskardutta/building-with-flutter-and-metamask-8h5)
- Users connect their wallets to the app.

### 3️⃣ User Flow (Buying & Sending Gifts)

- **Buying STAR tokens**: Users purchase tokens via MetaMask.
- **Sending Gifts**: Users send tokens to content creators as a form of engagement.
- **Transaction Approval**: Every action requires user confirmation in MetaMask.

### 4️⃣ What Happens on MetaMask vs. The DApp

| Action         | MetaMask Role           | DApp Role                         |
| -------------- | ----------------------- | --------------------------------- |
| Connect Wallet | Approves connection     | Links wallet to user profile      |
| Buy Tokens     | Approves transaction    | Adds tokens to user wallet        |
| Send Gift      | Approves token transfer | Calls smart contract for transfer |

## 🔍 Progress Update

I explored an **example [project](https://metamask-sdk-examples.vercel.app/)** provide by the metamask official documentation that demonstrates MetaMask integration in dApps using next.js, a youtube [video](https://www.youtube.com/watch?v=TNZngOM9jk4) and obviously chatGPT 😁. To deepen my understanding, I am planning to follow a **project-based learning approach** this week and start looking at smart contract.

📌 **Learning Resource:** [MetaMask dApp Tutorial](https://www.youtube.com/watch?v=fWFP32vlkPs)

I will experiment with this and share my findings with the team as we move forward with development.

🚀 **Next Steps:** Begin hands-on learning and testing MetaMask integration in a small prototype.

## FYI: This is just a cloned project from the official documentation to test and learn metamask integration.
