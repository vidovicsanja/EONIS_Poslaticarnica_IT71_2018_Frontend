import { create } from "zustand";

export const usePorudzbinaStore = create((set) => ({
  korpa: {
    proizvodIds: [],
    proizvodi: [],
  },
  dodajProizvod: (proizvod) =>
    set((state) => {
      const index = state?.korpa?.proizvodIds?.indexOf(proizvod?.id);

      if (index > -1) {
        let proizvodi = state?.korpa?.proizvodi;
        proizvodi[index] = proizvod;

        return {
          ...state,
          korpa: {
            proizvodIds: [...state?.korpa?.proizvodIds],
            proizvodi,
          },
        };
      } else {
        return {
          ...state,
          korpa: {
            proizvodIds: [...state?.korpa?.proizvodIds, proizvod?.id],
            proizvodi: [...state?.korpa?.proizvodi, proizvod],
          },
        };
      }
    }),
  izbrisiProizvod: (proizvodId) =>
    set((state) => ({
      ...state,
      korpa: {
        ...state?.korpa,
        proizvodIds: state?.korpa?.proizvodIds?.filter(
          (pId) => pId !== proizvodId
        ),
        proizvodi: state?.korpa?.proizvodi?.filter((p) => p?.id !== proizvodId),
      },
    })),
  praznaKorpa: () =>
    set({
      proizvodIds: [],
      proizvodi: [],
    }),
}));
