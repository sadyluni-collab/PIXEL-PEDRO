
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10111B",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 32,
  },

  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 4,
  },

  subtitle: {
    color: "#A5A7B8",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },

  section: {
    width: "100%",
    maxWidth: 420,
    marginBottom: 26,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  counter: {
    color: "#B6A0FF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  palette: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
    padding: 14,
    backgroundColor: "#1B1C2B",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#303147",
  },

  colorButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedColor: {
    borderColor: "#B6A0FF",
    transform: [{ scale: 1.08 }],
  },

  whiteColor: {
    borderColor: "#D1D5DB",
  },

  checkmark: {
    fontSize: 22,
    fontWeight: "900",
  },

  currentColorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingHorizontal: 4,
  },

  currentColorPreview: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#77798C",
    marginRight: 10,
  },

  currentColorText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },

  currentColorHint: {
    color: "#9294A8",
    fontSize: 11,
    marginLeft: "auto",
  },

  canvasCard: {
    backgroundColor: "#1B1C2B",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#303147",
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: "#000000",
    borderWidth: 2,
    borderColor: "#77798C",
    alignSelf: "center",
  },

  pixel: {
    borderWidth: 0.5,
    borderColor: "#777777",
  },

  canvasHint: {
    color: "#9294A8",
    fontSize: 12,
    marginTop: 18,
  },

  toolsSection: {
    width: "100%",
    maxWidth: 420,
    marginBottom: 24,
  },

  toolsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    marginBottom: 14,
  },

  toolButton: {
    flex: 1,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#1B1C2B",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#303147",
  },

  toolButtonActive: {
    backgroundColor: "#30264A",
    borderColor: "#B6A0FF",
  },

  toolIcon: {
    color: "#D2C5FF",
    fontSize: 20,
    fontWeight: "800",
  },

  toolText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  shareButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#8A2BE2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  disabledButton: {
    opacity: 0.6,
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  footer: {
    color: "#77798C",
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
});
