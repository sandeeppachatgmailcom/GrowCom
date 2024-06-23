export interface UpdatePromoCodeUseCase {
    updatePromoCode(data: { email: string; promoCode: string; }): Promise<{ status: boolean; message: string; role: string; } | void>;
  }