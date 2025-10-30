"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAnimal } from "@/services/Ong/Ong";
import { validateAnimalForm, AnimalFormData } from "@/validators/animal";
import { handleImageSelection, revokeImagePreview } from "@/utils/imageUpload";
import {
  especiesData,
  sexoData,
  porteOptions,
  coresData,
  getRacasOptions,
  getVacinasOptions
} from "@/data/animalData";
import Image from "next/image";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import Filter from "@/components/UI/Filter/Filter";
import {
  Save,
  ArrowLeft,
  Heart,
  Camera,
  X,
  Plus,
  Shield,
  Users,
} from "lucide-react";
import Error from "@/components/UI/Error/Error";
import styles from "./page.module.css";

interface ImagePreview {
  id: string;
  preview: string;
  file: File;
}

export default function CreateAnimal() {
  // Helper functions to transform data into dropdown format
  const getEspeciesOptions = () => {
    return especiesData.map(especie => ({
      value: especie.value,
      label: especie.label,
      icon: <Image src={especie.iconSrc} alt={especie.iconAlt} width={20} height={20} />
    }));
  };

  const getSexoOptions = () => {
    return sexoData.map(sexo => ({
      value: sexo.value,
      label: sexo.label,
      icon: sexo.iconType === "male" ? <BsGenderMale /> : <BsGenderFemale />
    }));
  };

  const getCoresOptions = () => {
    return coresData.map(cor => ({
      value: cor.value,
      label: cor.label,
      icon: <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: cor.hex, border: cor.value === 'Branco' ? '1px solid #e5e5e5' : 'none' }}></div>
    }));
  };

  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [selectedVacinas, setSelectedVacinas] = useState<string[]>([]);
  const [customRaca, setCustomRaca] = useState("");
  const [customCor, setCustomCor] = useState("");
  const [showCustomRaca, setShowCustomRaca] = useState(false);
  const [showCustomCor, setShowCustomCor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AnimalFormData>({
    nome: "",
    idade: 0,
    sexo: "",
    porte: "",
    cor: "",
    especie: "",
    raca: "",
    data_nascimento: "",
    vacinas: "",
    castrado: false,
    necessidades_especiais: "",
    historia: "",
    sociavel_animal: false,
    sociavel_pessoa: false,
    images: [],
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/entrar");
      return;
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach(img => {
        if (img.preview) {
          revokeImagePreview(img.preview);
        }
      });
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleInputChange = (field: keyof AnimalFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === "especie") {
      setFormData(prev => ({
        ...prev,
        raca: "",
        vacinas: "",
      }));
      setSelectedVacinas([]);
      setShowCustomRaca(false);
      setCustomRaca("");
    }

    if (field === "raca") {
      if (value === "Outra Raça") {
        setShowCustomRaca(true);
      } else {
        setShowCustomRaca(false);
        setCustomRaca("");
      }
    }

    if (field === "cor") {
      if (value === "Outros") {
        setShowCustomCor(true);
      } else {
        setShowCustomCor(false);
        setCustomCor("");
      }
    }

    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleVacinaToggle = (vacina: string) => {
    setSelectedVacinas(prev => {
      const newVacinas = prev.includes(vacina)
        ? prev.filter(v => v !== vacina)
        : [...prev, vacina];

      setFormData(prevFormData => ({
        ...prevFormData,
        vacinas: newVacinas.join(", ")
      }));

      return newVacinas;
    });
  };

  const handleImageAdd = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setApiError("");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await handleImageSelection(file);

      if (result.success) {
        const newImage: ImagePreview = {
          id: Date.now().toString() + i,
          preview: result.data.preview,
          file: result.data.file,
        };

        setImagePreviews(prev => [...prev, newImage]);
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), result.data.file]
        }));
      } else {
        setApiError(result.error.message);
        break;
      }
    }

    if (event.target) {
      event.target.value = '';
    }
  };

  const handleImageRemove = (imageId: string) => {
    setImagePreviews(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) {
        revokeImagePreview(imageToRemove.preview);

        setFormData(prevFormData => ({
          ...prevFormData,
          images: prevFormData.images?.filter((_, index) => {
            const imgIndex = prev.findIndex(img => img.id === imageId);
            return index !== imgIndex;
          }) || []
        }));
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const validateForm = (): boolean => {
    const finalFormData = {
      ...formData,
      raca: showCustomRaca ? customRaca : formData.raca,
      cor: showCustomCor ? customCor : formData.cor,
    };

    const errors = validateAnimalForm(finalFormData);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setApiError("Por favor, corrija os erros no formulário antes de salvar.");
      return;
    }

    try {
      setIsSaving(true);
      setApiError("");

      const multipartData = new FormData();

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          multipartData.append("images", file);
        });
      }

      const finalFormData = {
        ...formData,
        raca: showCustomRaca ? customRaca : formData.raca,
        cor: showCustomCor ? customCor : formData.cor,
      };

      Object.keys(finalFormData).forEach((key) => {
        if (key !== "images" && finalFormData[key as keyof AnimalFormData] !== undefined && finalFormData[key as keyof AnimalFormData] !== null) {
          const value = finalFormData[key as keyof AnimalFormData];
          if (typeof value === 'boolean') {
            multipartData.append(key, value.toString());
          } else if (typeof value === 'number') {
            multipartData.append(key, value.toString());
          } else if (typeof value === 'string' && value.trim() !== '') {
            multipartData.append(key, value);
          }
        }
      });

      await createAnimal(multipartData);
      router.push("/ong/dashboard");
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setApiError("Dados inválidos. Verifique os campos e tente novamente.");
      } else if (error?.response?.status === 422) {
        setApiError("Verifique os campos obrigatórios.");
      } else if (error?.response?.status === 413) {
        setApiError("Imagens muito grandes. O tamanho máximo é 5MB por imagem.");
      } else {
        setApiError("Erro ao cadastrar animal. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoBack = () => {
    router.push("/ong/dashboard");
  };

  const availableRacas = formData.especie ? getRacasOptions(formData.especie) : [];
  const availableVacinas = formData.especie ? getVacinasOptions(formData.especie) : [];

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando...</p>
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
        <div className={styles.header}>
          <button onClick={handleGoBack} className={styles.backButton}>
            <ArrowLeft size={20} />
            Voltar
          </button>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Criar Animal</h1>
            <p className={styles.subtitle}>
              Cadastre um novo animal para adoção
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Heart className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Informações Básicas</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nome *</label>
                  <input
                    type="text"
                    className={`${styles.input} ${fieldErrors.nome ? styles.inputWithError : ""}`}
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome do animal"
                    maxLength={100}
                  />
                  {fieldErrors.nome && (
                    <span className={styles.inputError}>{fieldErrors.nome}</span>
                  )}
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Idade *</label>
                    <input
                      type="number"
                      className={`${styles.input} ${fieldErrors.idade ? styles.inputWithError : ""}`}
                      value={formData.idade}
                      onChange={(e) => handleInputChange("idade", parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                    />
                    {fieldErrors.idade && (
                      <span className={styles.inputError}>{fieldErrors.idade}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Sexo *</label>
                    <Filter
                      value={formData.sexo}
                      onChange={(value) => handleInputChange("sexo", value)}
                      options={getSexoOptions()}
                      placeholder="Selecione o sexo"
                      className={fieldErrors.sexo ? styles.dropdownWithError : ""}
                    />
                    {fieldErrors.sexo && (
                      <span className={styles.inputError}>{fieldErrors.sexo}</span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Espécie *</label>
                    <Filter
                      value={formData.especie}
                      onChange={(value) => handleInputChange("especie", value)}
                      options={getEspeciesOptions()}
                      placeholder="Selecione a espécie"
                      className={fieldErrors.especie ? styles.dropdownWithError : ""}
                    />
                    {fieldErrors.especie && (
                      <span className={styles.inputError}>{fieldErrors.especie}</span>
                    )}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Raça *</label>
                    <Filter
                      value={formData.raca}
                      onChange={(value) => handleInputChange("raca", value)}
                      options={availableRacas}
                      placeholder={formData.especie ? "Selecione a raça" : "Selecione primeiro a espécie"}
                      className={fieldErrors.raca ? styles.dropdownWithError : ""}
                    />
                    {fieldErrors.raca && (
                      <span className={styles.inputError}>{fieldErrors.raca}</span>
                    )}
                  </div>
                </div>

                {showCustomRaca && (
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Especifique a raça *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={customRaca}
                      onChange={(e) => setCustomRaca(e.target.value)}
                      placeholder="Digite a raça do animal"
                      maxLength={50}
                    />
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Cor *</label>
                  <Filter
                    value={formData.cor}
                    onChange={(value) => handleInputChange("cor", value)}
                    options={getCoresOptions()}
                    placeholder="Selecione a cor"
                    className={fieldErrors.cor ? styles.dropdownWithError : ""}
                  />
                  {fieldErrors.cor && (
                    <span className={styles.inputError}>{fieldErrors.cor}</span>
                  )}
                </div>

                {showCustomCor && (
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Especifique a cor *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={customCor}
                      onChange={(e) => setCustomCor(e.target.value)}
                      placeholder="Digite a cor do animal"
                      maxLength={50}
                    />
                  </div>
                )}

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Porte</label>
                    <Filter
                      value={formData.porte || ""}
                      onChange={(value) => handleInputChange("porte", value)}
                      options={porteOptions}
                      placeholder="Selecione o porte"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Data de Nascimento</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={formData.data_nascimento || ""}
                      onChange={(e) => handleInputChange("data_nascimento", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Shield className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Saúde</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Vacinas</label>
                  <div className={styles.vacinasGrid}>
                    {availableVacinas.map((vacina) => (
                      <label key={vacina} className={styles.vacinaOption}>
                        <input
                          type="checkbox"
                          checked={selectedVacinas.includes(vacina)}
                          onChange={() => handleVacinaToggle(vacina)}
                          className={styles.checkbox}
                        />
                        <span className={styles.vacinaText}>{vacina}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Status de Castração</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="castrado"
                        checked={formData.castrado === true}
                        onChange={() => handleInputChange("castrado", true)}
                        className={styles.radio}
                      />
                      <span className={styles.radioText}>Castrado</span>
                    </label>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="castrado"
                        checked={formData.castrado === false}
                        onChange={() => handleInputChange("castrado", false)}
                        className={styles.radio}
                      />
                      <span className={styles.radioText}>Não castrado</span>
                    </label>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Necessidades Especiais</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.necessidades_especiais || ""}
                    onChange={(e) => handleInputChange("necessidades_especiais", e.target.value)}
                    placeholder="Descreva necessidades especiais, se houver..."
                    rows={3}
                    maxLength={200}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Users className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Comportamento</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Sociabilidade</label>
                  <div className={styles.sociabilityGrid}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.sociavel_animal || false}
                        onChange={(e) => handleInputChange("sociavel_animal", e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>Sociável com animais</span>
                    </label>

                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.sociavel_pessoa || false}
                        onChange={(e) => handleInputChange("sociavel_pessoa", e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>Sociável com pessoas</span>
                    </label>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>História</label>
                  <textarea
                    className={styles.textarea}
                    value={formData.historia || ""}
                    onChange={(e) => handleInputChange("historia", e.target.value)}
                    placeholder="Conte a história do animal..."
                    rows={4}
                    maxLength={500}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Camera className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Fotos</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.imagesContainer}>
                  {imagePreviews.map((image) => (
                    <div key={image.id} className={styles.imagePreview}>
                      <img src={image.preview} alt="Preview" className={styles.previewImage} />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(image.id)}
                        className={styles.removeImageButton}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleImageAdd}
                    className={styles.addImageButton}
                  >
                    <Plus size={24} />
                    <span>Adicionar foto</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  multiple
                  className={styles.fileInput}
                  aria-label="Selecionar imagens do animal"
                />

                <p className={styles.imageHelp}>
                  Adicione até 5 fotos do animal. Formatos aceitos: JPG, PNG, WebP (máx. 5MB cada)
                </p>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerActions}>
              <button
                type="button"
                onClick={handleGoBack}
                disabled={isSaving}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={styles.saveButton}
              >
                <Save size={16} />
                {isSaving ? "Salvando..." : "Cadastrar Animal"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}