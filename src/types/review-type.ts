export type ReviewType = {
    id: string,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
    createAt: string,
    guitarId: number,
}

export type ReviewPostType = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}
