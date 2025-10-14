"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./page.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Login attempt:", formData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <Image
            src="/icons/logoCapibaDark.svg"
            alt="Bicho Capiba"
            width={180}
            height={36}
            priority
          />
          <h1>Entrar na sua conta</h1>
          <p>Bem-vindo de volta! Entre para continuar sua jornada de adoção.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <Link href="/esqueci-senha" className={styles.forgotPassword}>
            Esqueci minha senha
          </Link>

          <Button
            variant="primary"
            color="green"
            size="large"
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className={styles.footer}>
          <p>
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro" className={styles.signupLink}>
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}