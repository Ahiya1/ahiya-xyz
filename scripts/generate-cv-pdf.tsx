import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToFile,
} from "@react-pdf/renderer";
import path from "path";
import { cvConfig, getAvailabilityText } from "../lib/cv-config";

// Professional one-page CV PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 25,
    borderBottom: "2px solid #7c3aed",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 3,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: "1px solid #e2e8f0",
  },
  contactItem: {
    fontSize: 9,
    color: "#64748b",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bodyText: {
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.5,
  },
  philosophyText: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 8,
  },
  systemRow: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: "1px solid #f1f5f9",
  },
  systemTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
  },
  systemDesc: {
    fontSize: 9,
    color: "#64748b",
    lineHeight: 1.4,
    marginTop: 2,
  },
  scopeList: {
    marginTop: 8,
  },
  scopeItem: {
    fontSize: 10,
    color: "#334155",
    marginBottom: 4,
  },
  scopeBullet: {
    color: "#7c3aed",
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 8,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },
  availabilityDotClosed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64748b",
  },
  availabilityText: {
    fontSize: 10,
    color: "#334155",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: "#64748b",
  },
  footerCta: {
    fontSize: 10,
    color: "#7c3aed",
    fontWeight: "bold",
    marginTop: 4,
  },
});

// CV PDF Document Component
const CVDocument = () => {
  const isOpen = cvConfig.availabilityStatus === "open";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ahiya Butman</Text>
          <Text style={styles.subtitle}>{cvConfig.copy.headline}</Text>
        </View>

        {/* Contact Row */}
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>ahiya.xyz</Text>
          <Text style={styles.contactItem}>{cvConfig.contactEmail}</Text>
          <Text style={styles.contactItem}>github.com/Ahiya1</Text>
        </View>

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vision</Text>
          <Text style={styles.bodyText}>{cvConfig.copy.subheadline}</Text>
          <Text style={styles.philosophyText}>{cvConfig.copy.philosophy}</Text>
        </View>

        {/* Systems Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Systems</Text>
          {cvConfig.systems.map((system, index) => (
            <View key={index} style={styles.systemRow}>
              <Text style={styles.systemTitle}>{system.name}</Text>
              <Text style={styles.systemDesc}>{system.description}</Text>
            </View>
          ))}
        </View>

        {/* Scope Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scope</Text>
          <View style={styles.scopeList}>
            {cvConfig.copy.operationalScope.map((item, index) => (
              <Text key={index} style={styles.scopeItem}>
                <Text style={styles.scopeBullet}>-</Text> {item}
              </Text>
            ))}
          </View>
        </View>

        {/* Availability Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityRow}>
            <View
              style={isOpen ? styles.availabilityDot : styles.availabilityDotClosed}
            />
            <Text style={styles.availabilityText}>{getAvailabilityText()}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{cvConfig.copy.contactSupportText}</Text>
          <Text style={styles.footerCta}>{cvConfig.contactEmail}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Generate PDF function
async function generatePDF() {
  const outputPath = path.join(process.cwd(), "public", "ahiya-cv.pdf");

  console.log("Generating CV PDF...");

  await renderToFile(<CVDocument />, outputPath);

  console.log(`CV PDF generated successfully: ${outputPath}`);
}

generatePDF().catch((error) => {
  console.error("Failed to generate CV PDF:", error);
  process.exit(1);
});
