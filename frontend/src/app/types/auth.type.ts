export interface AuthRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
}
