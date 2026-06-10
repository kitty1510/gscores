export class GroupASubjectGroup {
  static getTotalScoreSQL(): string {
    return `COALESCE("toan", 0) + COALESCE("vat_li", 0) + COALESCE("hoa_hoc", 0)`;
  }
}
