export default function changeLeagueRound(round: 2 | 8 | 16 | 4 | 64 | 32) {
  switch (round) {
    case 2:
      return 'النهائي';
    case 4:
      return 'نصف النهائي';
    case 8:
      return 'ربع النهائي';
    case 16:
      return 'دور الـ 16';
    case 32:
      return 'دور الـ 32';
    case 64:
      return 'دور الـ 64';
    default:
      return 'غير محدد';
  }
}
