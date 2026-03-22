"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, {});

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Crear cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Nombre completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
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
              Contraseña
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
          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creando cuenta..." : "Registrarme"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesion
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

