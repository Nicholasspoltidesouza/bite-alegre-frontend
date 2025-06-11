import { ReviewDTO } from '@/src/@types/DTO';
import { Star } from 'lucide-react';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definição de cores para manter o estilo consistente com a imagem
const COLORS = {
  orange: '#F59E0B',
  textPrimary: '#1F2937',   // Cinza bem escuro para nomes e texto principal
  textSecondary: '#6B7280', // Cinza médio para data e texto de apoio
  userIconBg: '#FEEBCB',    // Fundo do ícone de usuário (laranja bem claro)
  iconBorder: '#E2E8F0',    // Cor da estrela vazia
};

/**
 * Componente para exibir um único item de review.
 * @param {object} props
 * @param {object} props.review O objeto contendo os dados da avaliação.
 * @param {string} props.review.userName Nome do usuário.
 * @param {number} props.review.stars Número de estrelas (0 a 5).
 * @param {string} props.review.date Data da avaliação.
 * @param {string} props.review.feedback O texto do comentário.
 */

interface CardReviewProps {
    review: ReviewDTO;
}

export const ReviewItem: React.FC<CardReviewProps> = ({
    review
}) => {
  const UserIconPlaceholder = () => <View style={styles.userIcon} />;

  return (
    <View style={styles.reviewContainer}>
      {/* Coluna do Ícone */}
      <UserIconPlaceholder />

      {/* Coluna do Conteúdo */}
      <View style={styles.contentContainer}>
        <Text style={styles.userNameText}>{review.name ?? 'Ana Julia'}</Text>

        <View style={styles.metaContainer}>
          {/* Componente de Estrelas */}
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                color={index < review.stars ? COLORS.orange : COLORS.iconBorder}
                fill={index < review.stars ? COLORS.orange : 'transparent'}
              />
            ))}
          </View>
          <Text style={styles.dateText}>{review.date}</Text>
        </View>

        <Text style={styles.feedbackText}>{review.feedback}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 16,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.userIconBg,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1, // Ocupa o restante do espaço disponível
  },
  userNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 21, // Melhora a legibilidade do texto
    color: COLORS.textPrimary,
  },
});

export default ReviewItem;