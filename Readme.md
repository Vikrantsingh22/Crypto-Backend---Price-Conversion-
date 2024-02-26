### Crypto-Backend---Price-Conversion-

Welcome to Crypto-Backend---Price-Conversion-, a project designed to facilitate cryptocurrency-related tasks efficiently. This README.md provides an overview of the project's functionalities, setup instructions, and route documentation.

#### Project Overview

This project offers functionality in three major areas:

1. **Fetching Cryptocurrency Data**: Fetches the list of all cryptocurrency IDs and names listed on CoinGecko using its API. It stores this data in a MongoDB database, updating it every hour using a job scheduler.

2. **Currency Conversion**: Converts the value of any two currencies listed on CoinGecko in terms of each other. It calculates the value of the first coin in terms of the second coin on a specific date provided by the user.

3. **Company Holdings**: Provides a list of companies that hold a particular cryptocurrency. Currently, only Ethereum and Bitcoin are supported by CoinGecko.

#### Coding Practices and Techniques

- Utilizes best coding practices, including structured project directories and professional routing using Express Router.
- Configures CORS to enable backend server usage with frontend applications.
- Uses Axios for making API requests and Moment.js for date standardization.
- Implements error handling with the errorHandler middleware, ensuring error responses are in JSON format.
- Logs errors using the production-grade logger Winston, with error logs stored in MongoDB using Winston-MongoDB.
- Maintains sensitive values in a .env file to avoid exposure.
- Implements data standardization using Moment.js.
- Schedules updating jobs every hour using Node Cron.

#### How to Use

Follow these steps to set up and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/Vikrantsingh22/Crypto-Backend---Price-Conversion-.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory. Refer to the `.env.sample` file for required environment variables.

4. Ensure the `MONGO_URI` contains the database named `"coinList"` if the database uri have the db name `coinList` then collections `coinlists` and `logs` will be in the `coinList` database. If not, it will automatically create two database `coinList` and `test`, collection `coinlists ` will be stored in ` coinList` DB and `logs` in `"test"` DB.
   example:
   `bash
 mongodb+srv://username:<password>@clusterabjdsk.mongodb.net/coinList?retryWrites=true&w=majority&appName=Cluster0
 `

5. After creating .env, run the script:
   ```bash
   node app.js
   ```

#### Routes Documentation

Prefix can be any `URL` , for example, `localhost:5000` or any deployed link like `crypto-test.xyz` .

**Route 1**

- **GET Request**
- **URL** /api/convert
- `localhost:5000/api/convert` or `crypto-test.xyz/api/convert`
- **Request Body (JSON):**
  ```json
  {
    "fromCurrency": "bitcoin",
    "toCurrency": "basic-attention-token",
    "date": "23-02-2024"
  }
  ```
- **Response:**
  ```json
  {
    "msg": "1 bitcoin = 203614.90690748912 basic-attention-token",
    "onDate": "23-02-2024"
  }
  ```

**Route 2**

- **GET Request**
- **URL** /api/companyHoldings
- `localhost:5000/api/companyHoldings` or `crypto-test.xyz/api/companyHoldings`
- **Request Body (JSON):**
  ```json
  {
    "currency": "bitcoin"
  }
  ```
- **Response:**
  ```json
  {
    "msg": "Returning only the name of company other data is been discarded intentionally",
    "res": [
      "MicroStrategy Inc.",
      "Galaxy Digital Holdings",
      "Marathon Digital Holdings",
      "Tesla, Inc.",
      "Hut 8 Mining Corp",
      "Coinbase Global, Inc",
      "Block Inc.",
      "Riot Platforms, Inc",
      "Hive Blockchain",
      "CleanSpark Inc.",
      "NEXON Co Ltd",
      "Exodus Movement Inc",
      "Meitu Inc",
      "Bit Digital, Inc",
      "Bitfarms Limited",
      "NFT Investments PLC",
      "Cipher Mining",
      "DMG Blockchain Solutions Inc.",
      "Neptune Digital Assets Corp.",
      "BIGG Digital Assets Inc.",
      "Advanced Bitcoin Technologies AG",
      "FRMO Corp.",
      "The Brooker Group",
      "DigitalX",
      "LQwD Technologies Corp",
      "Cypherpunk Holdings Inc",
      "Core Scientific",
      "Mogo Inc."
    ]
  }
  ```

**Route 3**

- **GET Request**
- **URL** /api/listCoins/
- **Response:**
- `localhost:5000/api/listCoins/` or `crypto-test.xyz/api/listCoins/`
  ```json
  {
    "msg": "List of all the document stored in MONGODB database",
    "data": [
      {
        "_id": "65da685d5d37590999e4ebf1",
        "id": "01coin",
        "name": "01coin",
        "__v": 0
      },
      {
        "_id": "65da685d5d37590999e4ebf2",
        "id": "0chain",
        "name": "Zus",
        "__v": 0
      }
    ]
  }
  ```

Feel free to reach out if you have any questions or need further assistance!
