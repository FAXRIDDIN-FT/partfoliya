export interface IMovie{
    id: number,
    title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
}

export interface IGenre {
    id: number,
    name: string
}
export interface PersonData {
  name: string;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
  profile_path?: string;
  biography?: string;
}   