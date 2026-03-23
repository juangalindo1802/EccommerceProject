"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LoginFormProps = {
  registered?: boolean;
};

export function LoginForm({ registered = false }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Iniciar sesion</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          {registered ? (
            <p className="text-sm text-emerald-700">
              Cuenta creada. Si tu proyecto exige confirmacion por correo, validala y luego inicia
              sesion.
            </p>
          ) : null}
          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Ingresando..." : "Ingresar"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            No tienes cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

