#### Task for Remitly - currency converter

Used technologies:

1. React - Next.js
2. Chakra-ui for component styling
3. Typescript

How to run:

- git clone https://github.com/fdxs-alt/remitly-task.git
- cd remitly-task
- run app:
  - **docker build . -t currency-converter** && **docker run -it -p 3000:3000 --rm -d currency-converter**
  - OR using docker-compose - **docker-compose up**
  - OR using commands **yarn** && **yarn run build** && **yarn start**
- go to **http://localhost:3000/** and test app

How to run tests:

- in remitly-task folder run **yarn**
- then run **yarn test**
