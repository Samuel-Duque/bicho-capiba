"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/services/User/User";
import { formatPhone } from "@/utils/formatters";
import {
  Save,
  Check,
  User,
  Phone,
  Calendar,
  Home,
  Heart,
  RotateCcw,
} from "lucide-react";
import Error from "@/components/UI/Error/Error";
import styles from "./page.module.css";

export default function UserSettings() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<{
    fullName?: string | null;
    email?: string | null;
    telefone?: string | null;
    dataNascimento?: string | null;
    endereco?: string | null;
    tipoResidencia?: string | null;
    quantidadeMoradores?: number | null;
    possuiAnimais?: boolean | null;
    quantidadeAnimais?: number | null;
    sexoAnimais?: string | null;
    idadeAnimais?: string | null;
    experienciaComAnimais?: string | null;
    conhecimentoDespesasAnimais?: string | null;
    comportamentoAnimais?: string | null;
    possuiCriancas?: boolean | null;
    quantidadeCriancas?: number | null;
    faixaEtariaCriancas?: string | null;
    criancaNecessidadeEspecial?: boolean | null;
    tipoNecessidadeCriancas?: string | null;
    familiarNecessidadeEspecial?: boolean | null;
    tipoNecessidadeEspecialFamiliar?: string | null;
    areaExterna?: boolean | null;
    telaProtetora?: boolean | null;
    tempoDisponivel?: string | null;
    composicaoFamiliar?: string | null;
  }>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/entrar");
      return;
    }

    if (user) {
      setFormData(user);
      setApiError("");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    let processedValue = value;

    if (field === "telefone" && typeof value === "string") {
      processedValue = formatPhone(value);
    }

    setFormData((prev: any) => ({
      ...prev,
      [field]: processedValue,
    }));
    setHasChanges(true);
    setJustSaved(false);

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setApiError("");

      const updateData = {
        ...formData,
        dataNascimento: formData.dataNascimento || null,
      };

      await updateUserProfile(updateData);
      setHasChanges(false);
      setJustSaved(true);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setApiError("Dados inválidos. Verifique os campos e tente novamente.");
      } else if (error?.response?.status === 422) {
        setApiError("Verifique os campos obrigatórios.");
      } else {
        setApiError(
          "Erro ao salvar configurações. Verifique sua conexão e tente novamente."
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (user) {
      setFormData(user);
      setHasChanges(false);
      setApiError("");
      setFieldErrors({});
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando configurações...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      {apiError && (
        <Error error={{ message: apiError }} className={styles.errorBanner} />
      )}
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Configurações do Perfil</h1>
          <p className={styles.subtitle}>
            Mantenha suas informações sempre atualizadas para processos de adoção
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <User className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Informações Pessoais</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nome Completo</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.fullName || ""}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={`${styles.input} ${styles.disabledInput}`}
                    value={formData.email || ""}
                    placeholder="seu@email.com"
                    disabled
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Data de Nascimento</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.dataNascimento?.split('T')[0] || ""}
                    onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Phone className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Contato</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Telefone</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={formData.telefone || ""}
                    onChange={(e) =>
                      handleInputChange("telefone", e.target.value)
                    }
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Endereço</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.endereco || ""}
                    onChange={(e) =>
                      handleInputChange("endereco", e.target.value)
                    }
                    placeholder="Seu endereço completo"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Home className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Informações da Residência</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Tipo de Residência</label>
                  <select
                    className={styles.input}
                    value={formData.tipoResidencia || ""}
                    onChange={(e) => handleInputChange("tipoResidencia", e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="sitio">Sítio/Chácara</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Quantidade de Moradores</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={formData.quantidadeMoradores || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "quantidadeMoradores",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Possui Área Externa?</label>
                    <select
                      className={styles.input}
                      value={formData.areaExterna === null ? "" : formData.areaExterna ? "true" : "false"}
                      onChange={(e) => handleInputChange("areaExterna", e.target.value === "true")}
                    >
                      <option value="">Selecione</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Possui Tela Protetora?</label>
                  <select
                    className={styles.input}
                    value={formData.telaProtetora === null ? "" : formData.telaProtetora ? "true" : "false"}
                    onChange={(e) => handleInputChange("telaProtetora", e.target.value === "true")}
                  >
                    <option value="">Selecione</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Heart className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Experiência com Animais</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Já possui animais?</label>
                  <select
                    className={styles.input}
                    value={formData.possuiAnimais === null ? "" : formData.possuiAnimais ? "true" : "false"}
                    onChange={(e) => handleInputChange("possuiAnimais", e.target.value === "true")}
                  >
                    <option value="">Selecione</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                {formData.possuiAnimais && (
                  <>
                    <div className={styles.inputRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Quantidade</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={formData.quantidadeAnimais || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "quantidadeAnimais",
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Sexo dos Animais</label>
                        <select
                          className={styles.input}
                          value={formData.sexoAnimais || ""}
                          onChange={(e) => handleInputChange("sexoAnimais", e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="machos">Apenas Machos</option>
                          <option value="femeas">Apenas Fêmeas</option>
                          <option value="ambos">Ambos</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Idade dos Animais</label>
                      <select
                        className={styles.input}
                        value={formData.idadeAnimais || ""}
                        onChange={(e) => handleInputChange("idadeAnimais", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        <option value="filhotes">Filhotes</option>
                        <option value="jovens">Jovens</option>
                        <option value="adultos">Adultos</option>
                        <option value="idosos">Idosos</option>
                        <option value="variadas">Idades Variadas</option>
                      </select>
                    </div>
                  </>
                )}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Experiência com Animais</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.experienciaComAnimais || ""}
                    onChange={(e) =>
                      handleInputChange("experienciaComAnimais", e.target.value)
                    }
                    placeholder="Descreva sua experiência com animais"
                    rows={3}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Conhecimento sobre Despesas com Animais</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.conhecimentoDespesasAnimais || ""}
                    onChange={(e) =>
                      handleInputChange("conhecimentoDespesasAnimais", e.target.value)
                    }
                    placeholder="Como você avalia os custos de manter um animal?"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Calendar className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Família e Tempo Disponível</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Possui Crianças?</label>
                  <select
                    className={styles.input}
                    value={formData.possuiCriancas === null ? "" : formData.possuiCriancas ? "true" : "false"}
                    onChange={(e) => handleInputChange("possuiCriancas", e.target.value === "true")}
                  >
                    <option value="">Selecione</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                {formData.possuiCriancas && (
                  <>
                    <div className={styles.inputRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Quantidade de Crianças</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={formData.quantidadeCriancas || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "quantidadeCriancas",
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Faixa Etária das Crianças</label>
                        <select
                          className={styles.input}
                          value={formData.faixaEtariaCriancas || ""}
                          onChange={(e) => handleInputChange("faixaEtariaCriancas", e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option value="0-2">0-2 anos</option>
                          <option value="3-5">3-5 anos</option>
                          <option value="6-10">6-10 anos</option>
                          <option value="11-15">11-15 anos</option>
                          <option value="variadas">Idades Variadas</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Tempo Disponível para o Animal</label>
                  <select
                    className={styles.input}
                    value={formData.tempoDisponivel || ""}
                    onChange={(e) => handleInputChange("tempoDisponivel", e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="poucas-horas">Poucas horas por dia</option>
                    <option value="meio-periodo">Meio período</option>
                    <option value="periodo-integral">Período integral</option>
                    <option value="fins-de-semana">Principalmente fins de semana</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Composição Familiar</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.composicaoFamiliar || ""}
                    onChange={(e) =>
                      handleInputChange("composicaoFamiliar", e.target.value)
                    }
                    placeholder="Descreva a composição da sua família"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <button
              onClick={handleReset}
              disabled={isSaving || !hasChanges}
              className={styles.resetButton}
            >
              <RotateCcw size={16} />
              Redefinir
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || (!hasChanges && !justSaved)}
              className={`${styles.saveButton} ${
                hasChanges ? styles.hasChanges : ""
              } ${justSaved ? styles.saved : ""}`}
            >
              {justSaved ? (
                <>
                  <Check size={16} />
                  Salvo!
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}