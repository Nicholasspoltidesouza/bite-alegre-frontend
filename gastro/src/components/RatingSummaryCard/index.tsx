import Colors from '@/src/constants/Colors';
import { Star } from 'lucide-react';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definição de cores para manter o estilo consistente
const COLORS = {
  orange: '#F59E0B',        // Um tom de laranja vibrante para destaque
  cardBackground: '#FFFBF5', // Um bege/creme bem claro para o fundo do card
  textPrimary: '#1F2937',   // Um cinza escuro para o texto principal
  textSecondary: '#6B7280', // Um cinza médio para textos de apoio
  barBackground: '#E5E7EB', // Fundo cinza claro para as barras de progresso
};

/**
 * Um card que exibe um resumo das avaliações de um restaurante.
 * @param {object} props
 * @param {number} props.score A nota média, ex: 4.7
 * @param {number} props.reviewCount O número total de avaliações, ex: 57
 * @param {number[]} props.distribution Um array com 5 números (de 0 a 100) representando a porcentagem de cada nota (de 5 a 1 estrela).
 * Ex: [80, 15, 2, 2, 1] significa 80% de 5 estrelas, 15% de 4 estrelas, etc.
 */
const RatingSummaryCard = ({ score = 4.7, reviewCount = 57, distribution = [75, 18, 4, 2, 1] }) => {
  // Formata a nota para usar vírgula como separador decimal
  const formattedScore = score.toFixed(1).replace('.', ',');

  return (
    <View style={styles.cardContainer}>
      {/* Coluna da Esquerda: Nota Geral */}
      <View style={styles.scoreSection}>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>{formattedScore}</Text>
          <Star size={22} color={COLORS.orange} fill={COLORS.orange} style={styles.starIcon} />
        </View>
        <Text style={styles.reviewCountText}>{reviewCount} avaliações</Text>
      </View>

      {/* Linha Divisória Vertical */}
      <View style={styles.divider} />

      {/* Coluna da Direita: Distribuição das Notas */}
      <View style={styles.distributionSection}>
        {distribution.map((percentage, index) => (
          <View key={index} style={styles.barRow}>
            <Text style={styles.barLabel}>{5 - index}</Text>
            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${percentage}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  scoreSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  starIcon: {
    marginLeft: 4,
    marginTop: 12,
  },
  reviewCountText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: -4, // Ajuste fino para aproximar o texto da nota
  },
  divider: {
    width: 1,
    height: '90%',
    backgroundColor: Colors.orange.orangeStandard,
    marginHorizontal: 16,
  },
  distributionSection: {
    flex: 2,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Espaçamento entre as barras
  },
  barLabel: {
    width: 15, // Garante alinhamento das barras
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  barBackground: {
    flex: 1,
    height: 7,
    backgroundColor: COLORS.barBackground,
    borderRadius: 5,
    overflow: 'hidden', // Garante que a barra interna não ultrapasse as bordas
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.orange,
    borderRadius: 5,
  },
});

export default RatingSummaryCard;