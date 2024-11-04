// "use client";

// import {
//   createContext,
//   useState,
//   useContext,
//   type Dispatch,
//   type SetStateAction,
//   type ReactNode,
// } from "react";

// type contextValue = {
//   isMenuOpen: boolean;
//   setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
// };

// const BurgerMenuContext = createContext<contextValue | undefined>(undefined);

// function BurgerMenuProvider({ children }: { children: ReactNode }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <BurgerMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
//       {children}
//     </BurgerMenuContext.Provider>
//   );
// }

// export function useBurgerMenuCtx() {
//   const context = useContext(BurgerMenuContext);
//   if (context === undefined)
//     throw new Error("Context was used outside provider");
//   return context;
// }

// export default BurgerMenuProvider;
