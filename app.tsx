
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { captureRef } from "react-native-view-shot";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

const CORES = [
  "#FFFFFF",
  "#FFE135",
  "#FF8C00",
  "#E32636",
  "#FF69B4",
  "#8A2BE2",
  "#1F3FBF",
  "#4FB3E8",
  "#1E8B3A",
  "#7FD13B",
  "#8B4513",
  "#000000",
];

const TAMANHO = 8;
const COR_FUNDO = "#000000";

export default function App() {
  const { width } = useWindowDimensions();

  const [corAtual, setCorAtual] = useState("#000000");
  const [pixels, setPixels] = useState<string[]>(
    Array(TAMANHO * TAMANHO).fill(COR_FUNDO)
  );
  const [borrachaAtiva, setBorrachaAtiva] = useState(false);
  const [compartilhando, setCompartilhando] = useState(false);

  const gradeRef = useRef<View>(null);

  const tamanhoPixel = Math.min((width - 80) / TAMANHO, 48);
  const tamanhoGrade = tamanhoPixel * TAMANHO;

  function selecionarCor(cor: string) {
    setCorAtual(cor);
    setBorrachaAtiva(false);
  }

  function pixelar(index: number) {
    const novosPixels = [...pixels];

    novosPixels[index] = borrachaAtiva ? COR_FUNDO : corAtual;

    setPixels(novosPixels);
  }

  function limpar() {
    Alert.alert(
      "Limpar desenho",
      "Tem certeza de que deseja apagar todos os pixels?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () =>
            setPixels(Array(TAMANHO * TAMANHO).fill(COR_FUNDO)),
        },
      ]
    );
  }

  async function compartilhar() {
    if (compartilhando) return;

    try {
      setCompartilhando(true);

      const disponivel = await Sharing.isAvailableAsync();

      if (!disponivel) {
        Alert.alert(
          "Compartilhamento indisponível",
          "Teste esta função no aplicativo Expo Go ou em um dispositivo compatível."
        );
        return;
      }

      if (!gradeRef.current) {
        Alert.alert("Erro", "Não foi possível encontrar o desenho.");
        return;
      }

      const uri = await captureRef(gradeRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar Pixel Art",
        UTI: "public.png",
      });
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível gerar ou compartilhar a imagem."
      );
    } finally {
      setCompartilhando(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>PIXEL ART</Text>
          <Text style={styles.subtitle}>
            Transforme pequenos pixels em grandes ideias.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Paleta de cores</Text>
            <Text style={styles.counter}>12 CORES</Text>
          </View>

          <View style={styles.palette}>
            {CORES.map((cor) => {
              const selecionada =
                cor === corAtual && !borrachaAtiva;

              return (
                <Pressable
                  key={cor}
                  accessibilityRole="button"
                  accessibilityLabel={`Selecionar cor ${cor}`}
                  accessibilityState={{ selected: selecionada }}
                  onPress={() => selecionarCor(cor)}
                  style={[
                    styles.colorButton,
                    { backgroundColor: cor },
                    selecionada && styles.selectedColor,
                    cor === "#FFFFFF" && styles.whiteColor,
                  ]}
                >
                  {selecionada && (
                    <Text
                      style={[
                        styles.checkmark,
                        { color: cor === "#FFFFFF" ? "#111827" : "#FFFFFF" },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.currentColorRow}>
            <View
              style={[
                styles.currentColorPreview,
                { backgroundColor: borrachaAtiva ? COR_FUNDO : corAtual },
              ]}
            />
            <Text style={styles.currentColorText}>
              {borrachaAtiva ? "Borracha" : corAtual.toUpperCase()}
            </Text>
            <Text style={styles.currentColorHint}>
              {borrachaAtiva ? "Apagar pixels" : "Cor selecionada"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seu desenho</Text>
            <Text style={styles.counter}>8 × 8</Text>
          </View>

          <View style={styles.canvasCard}>
            <View
              ref={gradeRef}
              collapsable={false}
              style={[
                styles.grid,
                {
                  width: tamanhoGrade,
                  height: tamanhoGrade,
                },
              ]}
            >
              {pixels.map((pixel, index) => (
                <Pressable
                  key={index}
                  accessibilityRole="button"
                  accessibilityLabel={`Pintar pixel ${index + 1}`}
                  onPress={() => pixelar(index)}
                  style={[
                    styles.pixel,
                    {
                      width: tamanhoPixel,
                      height: tamanhoPixel,
                      backgroundColor: pixel,
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={styles.canvasHint}>
              Toque em um quadrado para pintar
            </Text>
          </View>
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Ferramentas</Text>

          <View style={styles.toolsRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setBorrachaAtiva(!borrachaAtiva)}
              style={[
                styles.toolButton,
                borrachaAtiva && styles.toolButtonActive,
              ]}
            >
              <Text style={styles.toolIcon}>⌫</Text>
              <Text style={styles.toolText}>Borracha</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={limpar}
              style={styles.toolButton}
            >
              <Text style={styles.toolIcon}>✕</Text>
              <Text style={styles.toolText}>Limpar</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={compartilhar}
            disabled={compartilhando}
            style={[
              styles.shareButton,
              compartilhando && styles.disabledButton,
            ]}
          >
            <Text style={styles.shareButtonText}>
              {compartilhando
                ? "Preparando imagem..."
                : "↗  Compartilhar desenho"}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Feito com criatividade, um pixel de cada vez.
        </Text>
      </ScrollView>
    </View>
  );
}
