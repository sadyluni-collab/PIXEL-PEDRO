import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

const COLORS = [
  "#FFFFFF", "#FFE135", "#FF8C00", "#E32636",
  "#FF69B4", "#8A2BE2", "#1F3FBF", "#4FB3E8",
  "#1E8B3A", "#7FD13B", "#8B4513", "#000000",
];

export default function App() {
  const { width: screenWidth } = Dimensions.get("window");
  const [pixels, setPixels] = useState<string[]>(Array(64).fill("#FFFFFF"));
  const [currentColor, setCurrentColor] = useState("#000000");
  const gradeRef = useRef<View>(null);
  const pixelSize = Math.min(42, Math.floor((Math.min(screenWidth - 48, 420)) / 8));
  const boardSize = pixelSize * 8;

  function paintPixel(index: number) {
    setPixels((previous) => {
      const next = [...previous];
      next[index] = currentColor;
      return next;
    });
  }

  function clearCanvas() {
    setPixels(Array(64).fill("#FFFFFF"));
  }

  async function shareDrawing() {
    try {
      if (Platform.OS === "web") {
        // A web-friendly fallback: render the pixel art to a downloadable PNG.
        const canvas = document.createElement("canvas");
        const scale = 32;
        canvas.width = 8 * scale;
        canvas.height = 8 * scale;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Não foi possível criar a imagem.");
        pixels.forEach((color, index) => {
          context.fillStyle = color;
          context.fillRect((index % 8) * scale, Math.floor(index / 8) * scale, scale, scale);
        });
        const link = document.createElement("a");
        link.download = "meu-desenho-pixel.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Ops", "O compartilhamento não está disponível neste dispositivo.");
        return;
      }
      const uri = await captureRef(gradeRef, { format: "png", quality: 1 });
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar desenho",
        UTI: "public.png",
      });
    } catch {
      if (Platform.OS === "web") {
        window.alert("Não foi possível exportar o desenho.");
      } else {
        Alert.alert("Ops", "Não foi possível compartilhar o desenho.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.logo}>▦ Pixel</Text>
        <Text style={styles.subtitle}>Sua arte, quadradinho por quadradinho.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PALETA DE CORES</Text>
        <View style={styles.palette}>
          {COLORS.map((color) => (
            <TouchableOpacity
              accessibilityLabel={`Selecionar cor ${color}`}
              key={color}
              onPress={() => setCurrentColor(color)}
              style={[
                styles.swatch,
                { backgroundColor: color },
                currentColor === color && styles.selectedSwatch,
              ]}
            >
              {currentColor === color && (
                <Text style={[styles.check, { color: color === "#FFFFFF" || color === "#FFE135" || color === "#7FD13B" ? "#222" : "#fff" }]}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.currentColorRow}>
          <View style={[styles.currentColorDot, { backgroundColor: currentColor }]} />
          <Text style={styles.currentColorText}>Cor selecionada: {currentColor}</Text>
        </View>
      </View>

      <View style={styles.boardSection}>
        <Text style={styles.sectionTitle}>SEU DESENHO · 8 × 8</Text>
        <View
          ref={gradeRef}
          collapsable={false}
          style={[styles.board, { width: boardSize, height: boardSize }]}
        >
          {pixels.map((color, index) => (
            <TouchableOpacity
              accessibilityLabel={`Pixel ${index + 1}`}
              key={index}
              onPress={() => paintPixel(index)}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: color,
                borderWidth: 0.5,
                borderColor: "#D9DDE5",
              }}
            />
          ))}
        </View>
        <Text style={styles.hint}>Escolha uma cor e toque nos quadradinhos para pintar.</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
          <Text style={styles.clearButtonText}>↺  Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareDrawing}>
          <Text style={styles.shareButtonText}>⇧  Exportar PNG</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>FEITO COM PIXELS ✦</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  header: { alignItems: "center", marginBottom: 8 },
  logo: { fontSize: 34, fontWeight: "900", color: "#20243A", letterSpacing: -1 },
  subtitle: { marginTop: 6, fontSize: 14, color: "#777D91" },
  section: { width: "100%", maxWidth: 420, alignItems: "center", marginVertical: 8 },
  sectionTitle: { fontSize: 11, fontWeight: "800", letterSpacing: 2, color: "#8B90A3", marginBottom: 14 },
  palette: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 9, maxWidth: 330 },
  swatch: { width: 38, height: 38, borderRadius: 11, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E1E3EB" },
  selectedSwatch: { borderColor: "#343A55", borderWidth: 3, transform: [{ scale: 1.06 }] },
  check: { fontSize: 19, fontWeight: "900" },
  currentColorRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  currentColorDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: "#D0D3DD" },
  currentColorText: { fontSize: 12, color: "#656B80", fontWeight: "600" },
  boardSection: { alignItems: "center", marginVertical: 8 },
  board: { flexDirection: "row", flexWrap: "wrap", overflow: "hidden", borderWidth: 2, borderColor: "#D9DDE5", borderRadius: 4, backgroundColor: "#fff" },
  hint: { fontSize: 12, color: "#858A9D", marginTop: 12, textAlign: "center" },
  actions: { flexDirection: "row", gap: 12, marginTop: 10 },
  clearButton: { paddingVertical: 13, paddingHorizontal: 20, borderRadius: 13, backgroundColor: "#E8EAF1" },
  clearButtonText: { color: "#454B62", fontWeight: "800", fontSize: 14 },
  shareButton: { paddingVertical: 13, paddingHorizontal: 20, borderRadius: 13, backgroundColor: "#6C63FF" },
  shareButtonText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  footer: { marginTop: 12, fontSize: 10, fontWeight: "800", letterSpacing: 2, color: "#B0B4C3" },
});
