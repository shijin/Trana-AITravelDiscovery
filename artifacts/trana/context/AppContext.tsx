import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Destination } from "@/data/mockData";

interface QuizAnswers {
  mood?: string;
  companion?: string;
  duration?: string;
  budget?: string;
  interests?: string[];
  activity?: string;
  city?: string;
}

interface AppContextType {
  wishlist: Destination[];
  savedItinerary: boolean;
  quizAnswers: QuizAnswers;
  addToWishlist: (dest: Destination) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  saveItinerary: () => void;
  setQuizAnswers: (answers: QuizAnswers) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  wishlist: [],
  savedItinerary: false,
  quizAnswers: {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isWishlisted: () => false,
  saveItinerary: () => {},
  setQuizAnswers: () => {},
  userEmail: "",
  setUserEmail: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Destination[]>([]);
  const [savedItinerary, setSavedItinerary] = useState(false);
  const [quizAnswers, setQuizAnswersState] = useState<QuizAnswers>({});
  const [userEmail, setUserEmailState] = useState("");
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const wl = await AsyncStorage.getItem("wishlist");
        if (wl) setWishlist(JSON.parse(wl));
        const itinerary = await AsyncStorage.getItem("savedItinerary");
        if (itinerary) setSavedItinerary(JSON.parse(itinerary));
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setUserEmailState(email);
          setIsLoggedInState(true);
        }
      } catch {}
    };
    load();
  }, []);

  const addToWishlist = useCallback(async (dest: Destination) => {
    setWishlist((prev) => {
      if (prev.find((d) => d.id === dest.id)) return prev;
      const next = [...prev, dest];
      AsyncStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback(async (id: number) => {
    setWishlist((prev) => {
      const next = prev.filter((d) => d.id !== id);
      AsyncStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (id: number) => wishlist.some((d) => d.id === id),
    [wishlist]
  );

  const saveItinerary = useCallback(async () => {
    setSavedItinerary(true);
    await AsyncStorage.setItem("savedItinerary", "true");
  }, []);

  const setQuizAnswers = useCallback((answers: QuizAnswers) => {
    setQuizAnswersState(answers);
  }, []);

  const setUserEmail = useCallback(async (email: string) => {
    setUserEmailState(email);
    await AsyncStorage.setItem("userEmail", email);
  }, []);

  const setIsLoggedIn = useCallback((v: boolean) => {
    setIsLoggedInState(v);
    if (!v) {
      AsyncStorage.removeItem("userEmail");
      setUserEmailState("");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        wishlist,
        savedItinerary,
        quizAnswers,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        saveItinerary,
        setQuizAnswers,
        userEmail,
        setUserEmail,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
