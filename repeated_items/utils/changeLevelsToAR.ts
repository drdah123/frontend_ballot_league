import { LevelNames } from '../types/ApiTypes';

export default function changeLevelsToAR(playerLevel: LevelNames) {
  return playerLevel === 'advanced'
    ? 'متقدم'
    : playerLevel === 'beginner'
    ? 'مبتدئ'
    : playerLevel === 'expert'
    ? 'خبير'
    : 'متوسط';
}
