FROM node:lts AS builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm serve && pnpm install && pnpm build

# Production image
FROM node:lts
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/dist .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
