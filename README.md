# Setup Peroject

Create .env file

```dotenv
DATABASE_URL="mysql://root:rootpass@localhost:3306/contact_db"
```
```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

node run dev

```
