import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config();

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    throw new Error("Uso: npm run admin:promote -- correo@dominio.com");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado en tabla User.");

  await prisma.user.update({
    where: { id: user.id },
    data: { isAdmin: true },
  });

  console.log(`Usuario ${email} promovido a admin.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

